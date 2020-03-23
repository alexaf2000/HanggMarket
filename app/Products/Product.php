<?php

namespace App\Products;

use Carbon\Carbon;
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
    /**
     * Prices
     * Relationship for Prices.
     * @return Price
     */
    public function Prices()
    {
        return $this->hasMany(Price::class);
    }

    /**
     * Price function
     * This will return the price of the product in a date.
     * @param String $dateToFind
     * @return Price
     */
    public function Price(String $dateToFind)
    {
        try {
            $date = Carbon::parse($dateToFind);
            return $this->Prices()->where('date_start', $dateToFind);
        } catch (\Throwable $th) {
            return null;
        }
    }
}
