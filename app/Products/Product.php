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

    /**
     * Categories
     * Relationship (Many-to-Many) for Categories.
     * @return Category
     */
    public function Categories()
    {
        return $this->belongsToMany(Category::class, 'category_products');
    }

    /**
     * Images
     * Relationship for Images.
     * @return Images
     */
    public function Images()
    {
        return $this->HasMany(Image::class);
    }
}
