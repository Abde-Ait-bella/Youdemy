<?php

namespace App\Models;

use PDO;

class Course extends Model {
    protected $table = 'courses';

    public function all(array $filters = []) {
        $query = "
            SELECT 
                courses.*, 
                categories.name AS category, 
                users.name AS teacher
            FROM courses
            LEFT JOIN categories ON courses.category_id = categories.id
            LEFT JOIN users ON courses.teacher_id = users.id
        ";
        $params = [];

        if (!empty($filters['teacher_id'])) {
            $query .= " WHERE teacher_id = :teacher_id";
            $params['teacher_id'] = $filters['teacher_id'];
        }
    
        $stmt = $this->db->prepare($query);
        $stmt->execute($params);
    
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }    

    public function find($id) {
        $query = "
            SELECT 
                courses.*, 
                categories.name AS category, 
                users.name AS teacher
            FROM courses
            LEFT JOIN categories ON courses.category_id = categories.id
            LEFT JOIN users ON courses.teacher_id = users.id
            WHERE courses.id = :id
        ";
        $stmt = $this->db->prepare($query);
        $stmt->execute(['id' => $id]);
        $course = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($course) {
            $course['tags'] = $this->getTags($id);
        }

        return $course;
    }

    public function create(array $data, array $tags = [], $image = null) {
        $this->db->beginTransaction();

        try {
            if ($image) {
                $data['image'] = $this->uploadImage($image);
            }

            parent::create($data);
            $courseId = $this->db->lastInsertId();

            if (!empty($tags)) {
                $this->syncTags($courseId, $tags);
            }

            $this->db->commit();

            return true;
        } catch (\Exception $e) {
            $this->db->rollBack();
            throw $e;
        }
    }

    public function update(array $data, array $tags = [], $image = null) {
        $this->db->beginTransaction();

        try {
            if ($image) {
                $data['image'] = $this->uploadImage($image);
            }

            parent::update($data);

            if (!empty($tags)) {
                $this->syncTags($data['id'], $tags);
            }

            $this->db->commit();

            return true;
        } catch (\Exception $e) {
            $this->db->rollBack();
            throw $e;
        }
    }

    private function getTags($courseId) {
        $query = "
            SELECT 
                tags.name 
            FROM tags
            INNER JOIN course_tags ON tags.tag_id = course_tags.tag_id
            WHERE course_tags.course_id = :course_id
        ";
        $stmt = $this->db->prepare($query);
        $stmt->execute(['course_id' => $courseId]);
        return $stmt->fetchAll(PDO::FETCH_COLUMN);
    }

    private function syncTags($courseId, array $tags) {
        $queryDelete = "DELETE FROM course_tags WHERE course_id = :course_id";
        $stmtDelete = $this->db->prepare($queryDelete);
        $stmtDelete->execute(['course_id' => $courseId]);

        if (!empty($tags)) {
            $queryInsert = "INSERT INTO course_tags (course_id, tag_id) VALUES (:course_id, :tag_id)";
            $stmtInsert = $this->db->prepare($queryInsert);

            foreach ($tags as $tagId) {
                $stmtInsert->execute(['course_id' => $courseId, 'tag_id' => $tagId]);
            }
        }
    }

    private function uploadImage($image) {
        $targetDir = "uploads/courses/";
        $imageName = uniqid() . "_" . basename($image['name']);
        $targetFilePath = $targetDir . $imageName;

        if (move_uploaded_file($image['tmp_name'], $targetFilePath)) {
            return $targetFilePath;
        }

        throw new \Exception("Failed to upload image");
    }
}
