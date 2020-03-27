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
    protected $appends = ['price'];

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
        return $this->hasMany(Image::class);
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
     * Price attribute
     * This will return the price of the product in a date.
     * @return Price
     */

    public function getPriceAttribute()
    {
        // Uses today date
        $date = Carbon::today();

        $price = $this->Prices()->whereDate('date_start', '<=', $date)->whereDate('date_end', '>=', $date)->first();
        if ($price !== null) {
            return $price->value;
        }
    }
}
