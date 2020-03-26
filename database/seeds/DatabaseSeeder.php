<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // Add's admins user and faker users
        $this->call(UserSeeder::class);
        // Add's default categories
        $this->call(CategorySeeder::class);
        // Add's default products (with prices and also categories relationship)
        $this->call(ProductSeeder::class);
    }
}
