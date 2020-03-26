<?php

namespace App\Http\Controllers;

use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the users paginated by 15.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::paginate(15);
    }

    /**
     * Store a newly created user in db.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Let's validate the request
        $request->validate([
            'name' => 'required',
            'lastname' => 'required',
            'email' => 'email|required|unique:users,email',
            'password' => 'required',
            'password_confirmation' => 'required|same:password',
            'birthdate' => 'date|required',
        ]);

        // Let's create the user with the request values
        $User = new User([
            'name' => $request->name,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'birthdate' => Carbon::parse($request->birthdate)
        ]);
        // If is set a profile image
        if ($request->profile_image) {
            // Also define it
            $User->profile_image = $request->profile_image;
        }
        $User->save();
        return $User;
    }

    /**
     * Display the specified user.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return $user;
    }

    /**
     * Update the specified public data of user in db.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        // Let's validate the request
        $request->validate([
            'name' => 'required',
            'lastname' => 'required',
            'email' => 'email|required|unique:users,email,' . $user->id,
            'birthdate' => 'date|required',
        ]);

        // Fill the new data with user object
        $user->fill([
            'name' => $request->name,
            'lastname' => $request->lastname,
            'email' => $request->email,
            'birthdate' => Carbon::parse($request->birthdate)
        ]);
        // Saves the user data
        $user->save();
        return $user;
    }

    /**
     * Update the password of a user
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function updateCredentials(Request $request, User $user)
    {
        // Let's validate if password is confirmed and equals
        $request->validate([
            'password' => 'required',
            'password_confirmation' => 'required|same:password',
        ]);

        // Saves the user data
        $user->password = bcrypt($request->password);
        $user->save();

        return $user;
    }
    /**
     * Update the profile image of a user
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function updateProfileImage(Request $request, User $user)
    {
        // Validate if ProfileImage is on request
        $request->validate([
            'profile_image' => 'required',
        ]);

        // Saves the profile image
        $user->profile_image = $request->profile_image;
        $user->save();

        return $user;
    }

    /**
     * Remove the specified user from db.
     *
     * @param  \App\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $user->forceDelete();
    }
}
