<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        // Generate the rules
        $rules = [
            'email' => 'required|exists:users',
            'password'  => 'required'
        ];
        // Validates the login data
        $request->validate($rules);

        // Defines data
        $data = [
            'email' => $request->get('email'),
            'password'  =>  $request->get('password')
        ];
        // If correct login
        if (Auth::attempt($data)) {
            $user = Auth::user();

            // the $user->createToken('HanggMarket')->accessToken generates the JWT token that we can use

            return response()->json([
                'user'  =>  $user, // <- we're sending the user info for frontend usage
                'token' =>  $user->createToken('HanggMarket')->accessToken // <- token is generated and sent back to the front end
            ]);
        } else {
            return response()->json('Unauthorized', 401);
        }
    }
}
