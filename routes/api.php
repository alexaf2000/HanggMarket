<?php

use Illuminate\Http\Request;
use Illuminate\Routing\RouteGroup;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', 'AuthController@login');

// Required login routes

Route::group(['middleware' => 'auth:api'], function () {

    // Products routes
    Route::group(['prefix' => 'product'], function () {
        Route::get('/', 'ProductController@index');
        Route::post('/store', 'ProductController@store');
        Route::get('/show/{product}/prices', 'ProductController@showPrices');
        Route::get('/show/{product}', 'ProductController@show');
        Route::post('/update/{product}', 'ProductController@update');
        Route::delete('/destroy/{product}', 'ProductController@destroy');
    });
    // Prices routes
    Route::group(['prefix' => 'price'], function () {
        Route::post('/store/product/{product}', 'PriceController@store');
        Route::delete('/destroy/{price}', 'PriceController@destroy');
        Route::post('/update/{price}', 'PriceController@update');
    });
    // Category routes
    Route::group(['prefix' => 'category', 'middleware' => 'auth:api'], function () {
        Route::get('/', 'CategoryController@index');
        Route::post('/store', 'CategoryController@store');
        Route::get('/show/{category}', 'CategoryController@show');
        Route::post('/update/{category}', 'CategoryController@update');
        Route::delete('/destroy/{category}', 'CategoryController@destroy');
    });

    // Users routes
    Route::group(['prefix' => 'user'], function () {
        Route::get('/', 'UserController@index');
        Route::post('/store', 'UserController@store');
        Route::get('/show/{user}', 'UserController@show');
        Route::post('/update/{user}', 'UserController@update');
        Route::post('/update/{user}/credentials', 'UserController@updateCredentials');
        Route::post('/update/{user}/image', 'UserController@updateProfileImage');
        Route::delete('/destroy/{user}', 'UserController@destroy');
    });

    Route::get('/details', function (Request $request) {
        return $request->user();
    });
});
