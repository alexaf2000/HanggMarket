<?php

namespace App\Products;

use Illuminate\Database\Eloquent\Model;

/**
 * Price class
 * This is a product price
 */
class Price extends Model
{
    protected $fillable = ['date_start', 'date_end'];

}
