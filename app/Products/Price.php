<?php

namespace App\Products;

use Illuminate\Database\Eloquent\Model;

/**
 * Price class
 * This is a product price
 */
class Price extends Model
{
    protected $fillable = ['value', 'date_start', 'date_end'];

    public function Product()
    {
        $this->belongsTo(Product::class);
    }
}
