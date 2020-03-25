<?php

namespace App\Http\Controllers;

use App\Products\Price;
use App\Products\Product;
use Illuminate\Http\Request;

class PriceController extends Controller
{
    /**
     * Store a newly created price for a product
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Products\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Product $product)
    {
        return $product->Prices()->create(['date_start' => $request->date_start, 'date_end' => $request->date_end, 'value' => $request->value]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Price  $price
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Price $price)
    {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Price  $price
     * @return \Illuminate\Http\Response
     */
    public function destroy(Price $price)
    {
        $price->forceDelete();
    }
}
