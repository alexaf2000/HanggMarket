<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Products\Price;
use App\Products\Product;
use Faker\Generator as Faker;

// Generates a random product

$factory->define(Product::class, function (Faker $faker) {
    return [
        "name" => $faker->unique()->words($nb = 2, $asText = true), // Two random words as name
        "description" => $faker->sentence($nbWords = 6, $variableNbWords = true), // Six sentences as description
        "barcode" => $faker->unique()->randomNumber($nbDigits = 8)  // And a 8 random numbers
    ];
});
$factory->define(Price::class, function (Faker $faker) {
    return [
        'value' => $faker->randomFloat($nbMaxDecimals = 2, $min = 5, $max = 100), // Generates a random number with 2 decimals
        'date_start' => $faker->dateTimeBetween($startDate = '-30 days', $endDate = '+30 days')->format('Y-m-d'), // Generates a date 30 days before or later
        'date_end' => $faker->dateTimeBetween($startDate = '-30 days', $endDate = '+30 days')->format('Y-m-d')
    ];
});
