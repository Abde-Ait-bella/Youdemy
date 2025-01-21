<?php

namespace App\Controllers;

use App\Models\User;

class UserController extends Controller {
    public function __construct() {
        $this->model = new User();
    }

    public function create($request) {
        $request = [
            'name' => $request['name'],
            'email' => $request['email'],
            'role' => $request['role'] ?? 'student',
            'status' => $request['status'],
            'password' => password_hash($request['password'], PASSWORD_BCRYPT),
        ];

        parent::create($request);
    }

    public function update($request) {
        $password = $request['password'];
        $request = [
            'id' => $request['id'],
            'name' => $request['name'],
            'email' => $request['email'],
            'role' => $request['role'] ?? 'student',
            'status' => $request['status']
        ];

        if (!empty($password)) {
            $request['password'] = password_hash($password, PASSWORD_BCRYPT);
        }

        parent::update($request);
    }

    public function login($request) {
        $user = $this->model->findByEmail($request['email']);

        if ($user && password_verify($request['password'], $user['password'])) {
            $this->response($user, 200);
            return;
        }

        $this->error('Identifiants invalides.', 401);
    }
}
