<?php

namespace App\Products;

use Illuminate\Database\Eloquent\Model;

/**
 * Image class
 * A product image.
 * This model just contains the id, will be
 * used to identify the created image filename.
 */
class Image extends Model
{
    protected $fillable = ["image"];
    /**
     * Product
     * Relationship Products.
     * @return Product
     */
    public function Product()
    {
        return $this->belongsTo(Product::class);
    }
}
