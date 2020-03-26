<?php

use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Creates 2 random products with 3 random prices
        factory(App\Products\Product::class, 5)->create()->each(function ($product) {
            // Creates the prices
            $product->prices()->saveMany(factory(App\Products\Price::class, 3)->make());

            // Let's attach some categories to this product with id between 1 and 5
            $product->categories()->attach(rand(1, 5));
        });
    }
}
