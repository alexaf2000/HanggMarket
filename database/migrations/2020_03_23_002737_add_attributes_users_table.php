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
            $table->unsignedBigInteger('profileimage_id')->before('created_at')->nullable();
            $table->foreign('profileimage_id')->references('id')->on('profile_images')->onDelete('cascade');
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
            //
        });
    }
}
