<?php

namespace App\Models;

use PDO;

class User extends Model {
    protected $table = 'users';

    public function all(array $filters = []) {
        $query = "SELECT id, name, email, role, status FROM {$this->table}";
        $params = [];

        if (!empty($filters['role'])) {
            $query .= " WHERE role = :role";
            $params['role'] = $filters['role'];
        }

        $stmt = $this->db->prepare($query);
        $stmt->execute($params);

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function findByEmail(string $email) {
        $query = "SELECT * FROM {$this->table} WHERE email = :email LIMIT 1";
        $stmt = $this->db->prepare($query);
        $stmt->execute(['email' => $email]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ?: null;
    }
}
