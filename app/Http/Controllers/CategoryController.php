<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Products\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of Categories.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $Categories = new Category();
        // If on route URL parameters is search we gonna use it for search
        if (isset($request->search)) {
            $searchTerm = $request->search;
            $Categories = $Categories->where('name', 'LIKE', "%{$searchTerm}%")->orWhere('description', 'LIKE', "%{$searchTerm}%");
        }
        // Will return this with pagination by using page URL parameter
        return $Categories->paginate(15);
    }

    /**
     * Store a a new created Category.
     *
     * @param  \Illuminate\Http\CategoryRequest  $request
     * This kind of Request will check if name and description is right.
     * @return \Illuminate\Http\Response (Category)
     */
    public function store(CategoryRequest $request)
    {
        // Creates the object
        $Category = new Category(['name' => $request->name, 'description' => $request->description]);
        // Stores it in the db
        $Category->save();
        // Return the object from the db
        return $Category;
    }

    /**
     * Display the specified category.
     *
     * @param  \App\Products\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        return $category;
    }

    /**
     * Update the specified category in storage.
     *
     * @param  \Illuminate\Http\CategoryRequest  $request
     * @param  \App\Products\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(CategoryRequest $request, Category $category)
    {
        // Modifies the attributes
        $category->name = $request->name;
        $category->description = $request->description;
        // Save the model from db
        $category->save();
        // Returns the category
        return $category;
    }

    /**
     * Remove the specified category from database.
     *
     * @param  \App\Products\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        $category->forceDelete();
    }
}
