<?php

namespace App\Products;

use Illuminate\Database\Eloquent\Model;

/**
 * Category class
 * A product category
 */
class Category extends Model
{
    protected $fillable = [
        'name', 'description'
    ];
}
