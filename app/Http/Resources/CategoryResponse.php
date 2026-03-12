<?php

namespace App\Http\Resources;

use App\Models\Category;
use JsonSerializable;

class CategoryResponse implements JsonSerializable
{
    public array $data;
    public Category $eloquentData;

    public function __construct(Category $category)
    {
        $this->data = $category->toArray();
        $this->eloquentData = $category;
    }

    public function jsonSerialize(): array
    {
        return [
            'data' => $this->data,
            'eloquentData' => $this->eloquentData->toArray()
        ];
    }
}