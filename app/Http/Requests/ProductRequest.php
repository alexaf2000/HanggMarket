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
            'category' => 'required|integer',
            'price' => 'required|double',
            'date_start' => 'date', // Can be not defined and auto-seted today
            'date_end' => 'required|date',
        ];
    }
}
