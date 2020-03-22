<?php

namespace App\Products;

use Illuminate\Database\Eloquent\Model;

/**
 * Product class
 * This is a usual Product
 */
class Product extends Model
{
    protected $fillable = [
        'name', 'description', 'barcode'
    ];
}
