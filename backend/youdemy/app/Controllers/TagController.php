<?php

namespace App\Controllers;

use App\Models\Tag;

class TagController extends Controller {
    public function __construct() {
        $this->model = new Tag();
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