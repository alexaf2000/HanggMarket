<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Products\Product;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    /**
     * Display a listing Products with images, actual price and categories.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        // Set the day as today
        $date = Carbon::today();
        $Products = new Product();

        // Return the Product with images, categories and JUST the price of today
        // ? Not used the Price model function because is not compatible with paginate
        $Products = $Products->with(['Images', 'Categories', 'Prices' => function ($q) use ($date) {
            $q->whereDate('date_start', '<=', $date);
            $q->whereDate('date_end', '>=', $date);
        }]);


        // Search where category - If defined Category as parameter
        if (isset($request->category)) {
            $Products = $Products->whereHas('categories', function (Builder $query) use ($request) {
                $query->where('id', '=', $request->category);
            });
        }


        // Search terms if isset and is not empty
        if (isset($request->search)) {
            $searchTerm = $request->search;
            // Important the use inside a function, because if not, the before wheres will not be used
            $Products = $Products->where(function ($q) use ($searchTerm) {
                $q->where('name', 'LIKE', "%{$searchTerm}%")->orWhere('description', 'LIKE', "%{$searchTerm}%");
            });
        }



        return $Products->paginate(15);
    }

    /**
     * Store a newly created Product in storage.
     * @requires name,description,barcode,categories,price,date_end
     * @allow not use image, and date_start(from price)
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(ProductRequest $request)
    {

        // Add own attributes
        $Product = new Product(['name' => $request->name, 'description' => $request->description, 'barcode' => $request->barcode]);

        // Saves to database
        $Product->save();

        // Adds categories
        $Product->categories()->attach($request->categories);


        // if start date does not exists
        if (!isset($request->date_start)) {
            // Use today
            $request->date_start = Carbon::today();
        }

        // Creates this product price
        $Product->Prices()->create([
            'value' => $request->price,
            'date_start' => $request->date_start,
            'date_end' => Carbon::parse($request->date_end)
        ]);

        if (isset($request->images)) {
            foreach ($request->images as $image) {
                $Product->Images()->create(["image" => $image]);
            }
        }

        return $Product;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        // Generates the date as today
        $date = Carbon::today();

        // Returns the product with images, categories and price of today
        $product = Product::with(['Images', 'Categories', 'Prices' => function ($q) use ($date) {
            $q->whereDate('date_start', '<=', $date);
            $q->whereDate('date_end', '>=', $date);
            $q->first();
        }])->find($product->id);
        return $product;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request, Product $product)
    {
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        $product->forceDelete();
    }
}
