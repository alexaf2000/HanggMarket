<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('categories')->insert([
            'name' => 'Hogar',
            'description' => 'Productos dedicados al hogar.',
        ]);
        DB::table('categories')->insert([
            'name' => 'Salud e higiene',
            'description' => 'Para el cuidado de la salud y la higiene personal.',
        ]);
        DB::table('categories')->insert([
            'name' => 'Comida',
            'description' => 'Productos para el consumo.',
        ]);
        DB::table('categories')->insert([
            'name' => 'Informatica y electronica',
            'description' => 'Dispositivos tecnologicos, informaticos y electronicos.',
        ]);
        DB::table('categories')->insert([
            'name' => 'Cine y musica',
            'description' => 'Blurays, dvds y cds de musica.',
        ]);
        DB::table('categories')->insert([
            'name' => 'Videojuegos',
            'description' => 'Productos dedicados a las videoconsolas y videojuegos.',
        ]);
    }
}
