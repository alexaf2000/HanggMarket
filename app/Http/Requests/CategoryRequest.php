<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        // If is updating...
        if (isset($this->category->id)) {
            return [
                'name' => "required|max:40|unique:categories,name,{$this->category->id}",
                'description' => 'required|max:250'
            ];
            // If not (is creating)
        } else {
            return [
                'name' => 'required|max:40|unique:categories',
                'description' => 'required|max:250'
            ];
        }
    }
}
