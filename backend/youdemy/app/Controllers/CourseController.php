<?php

namespace App\Controllers;

use App\Models\Course;

class CourseController extends Controller {
    public function __construct() {
        $this->model = new Course();
    }

    public function create($request) {
        $request = [
            'title' => $request['title'],
            'description' => $request['description'],
            'content' => $request['content'],
            'category_id' => $request['category_id'],
            'teacher_id' => $request['teacher_id']
        ];

        parent::create($request, $request['tags'] ?? null);
    }

    public function update($request) {
        $request = [
            'id' => $request['id'],
            'title' => $request['title'],
            'description' => $request['description'],
            'content' => $request['content'],
            'category_id' => $request['category_id'],
            'teacher_id' => $request['teacher_id']
        ];

        parent::update($request, $request['tags'] ?? null);
    }
}
