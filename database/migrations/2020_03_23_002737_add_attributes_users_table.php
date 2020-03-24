<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddAttributesUsersTable extends Migration
{
    /**
     * Run the migrations.
     * This modifies the default users table inserting
     * the required columns.
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('lastname')->after('name');
            $table->date('birthdate')->before('created_at');
            $table->binary('profile_image')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['lastname', 'birthdate', 'profile_image']);
        });
    }
}
