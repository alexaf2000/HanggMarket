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
        // (price as model accessor)
        $Products = $Products->with(['Images', 'Categories']);


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

        // If image was set
        if (isset($request->images)) {
            // Foreach image we gonna try to put it
            foreach ($request->images as $image) {
                try {
                    $Product->Images()->create(["image" => $image]);
                } catch (\Throwable $th) {
                    // If there was some error uploading the image write on log file
                    error_log($th->getMessage);
                }
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

        // Returns the product with images, categories and price of today (price as model accessor)
        $product = Product::with(['Images', 'Categories'])->find($product->id);

        return $product;
    }

    /**
     * Display the product prices.
     *
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function showPrices(Product $product)
    {
        // Return the prices of this product
        return $product->Prices;
    }

    /**
     * Update a product.
     * Supports name,description,barcode and category
     * Other paramethers needs it's own controller
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(ProductRequest $request, Product $product)
    {
        // Set new values
        $product->name = $request->name;
        $product->description = $request->description;
        $product->barcode = $request->barcode;

        // Saves the new values into db
        $product->save();

        // Then creates the relationship
        $product->categories()->sync($request->categories);

        return $product;
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
