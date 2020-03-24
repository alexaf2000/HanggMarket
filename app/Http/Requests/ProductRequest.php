<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'name' => 'required|unique:products|max:40',
            'description' => 'required',
            'barcode' => 'required|integer|unique:products',
            'categories' => 'array',
            'categories.*' => 'required|integer|exists:categories,id', // Check if array values exists in categories table
            'price' => 'required|numeric',
            'date_start' => 'date|nullable', // Can be not defined and auto-seted today
            'date_end' => 'required|date|after:date_start',
            'images' => 'nullable|array',
            'images.*' => 'nullable', // Check if array values exists in categories table
        ];
    }
}
