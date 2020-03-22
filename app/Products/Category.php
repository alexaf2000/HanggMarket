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
/**
 * Products
 * Relationship (Many-to-Many) for Products.
 * @return Product
 */
    public function Products()
    {
        return $this->belongsToMany(Product::class, 'category_products');
    }
}
