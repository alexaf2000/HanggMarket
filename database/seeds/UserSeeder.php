<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserSeeder extends Seeder
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
            'name' => 'Pepito',
            'lastname'=> 'Grillo',
            'email' => 'admin@admin.com',
            'birthdate'=> Carbon::parse('22-11-2000'),
            'password' => bcrypt('admin')
        ]);
    }
}
