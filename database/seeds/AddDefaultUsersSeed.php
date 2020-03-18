<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AddDefaultUsersSeed extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Add admin user
        DB::table('users')->insert([
            'name' => 'Administrador',
            'email' => 'admin@admin.com',
            'password' => bcrypt('admin')
        ]);
    }
}
