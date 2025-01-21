<?php

namespace App\Controllers;

class Controller {
    protected $model;

    public function index($request = []) {
        $data = $this->model->all($request);
        $this->response($data, 200);
    }

    public function show($request) {
        $id = $request['id'] ?? null;
        if (!$id) {
            $this->error("Missing 'id' parameter.", 400);
        }

        $data = $this->model->find($id);
        if ($data) {
            $this->response($data, 200);
            return;
        }

        $this->error("Resource not found.", 404);
    }

    public function create($request) {
        if ($this->model->create($request)) {
            $this->response(['message' => 'Resource successfully created.'], 201);
            return;
        }

        $this->error("Failed to create resource.", 400);
    }

    public function update($request) {
        if ($this->model->update($request)) {
            $this->response(['message' => 'Resource successfully updated.'], 200);
            return;
        }

        $this->error("Failed to update resource.", 400);
    }

    public function delete($request) {
        $id = $request['id'] ?? null;
        if (!$id) {
            $this->error("Missing 'id' parameter.", 400);
        }

        if ($this->model->delete($id)) {
            $this->response(['message' => 'Resource successfully deleted.'], 200);
            return;
        }

        $this->error("Failed to delete resource.", 400);
    }

    protected function response($data, int $status = 200) {
        header('Content-Type: application/json');
        http_response_code($status);
        echo json_encode($data);
        exit;
    }

    protected function error(string $message, int $status = 400) {
        $this->response(['error' => $message], $status);
    }
}
