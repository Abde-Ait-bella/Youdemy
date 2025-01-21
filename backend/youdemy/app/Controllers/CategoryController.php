<?php

namespace App\Controllers;

use App\Models\Category;

class CategoryController extends Controller {
    public function __construct() {
        $this->model = new Category();
    }

    public function create($request) {
        $request = ['name' => $request['name']];
        parent::create($request);
    }

    public function update($request) {
        $request = ['id' => $request['id'], 'name' => $request['name']];
        parent::update($request);
    }
}