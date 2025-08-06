<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class UserController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Users', [
            'users' => User::paginate(10)
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/UserForm', [
            'user' => null
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'role' => 'required',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'password' => Hash::make(Str::random(12)), // temp hashed password
        ]);

        // Send password reset email so they can set their own password
        Password::sendResetLink(['email' => $user->email]);

        return redirect()->route('admin.users.index')->with('success', 'User created and password reset link sent.');
    }

    public function edit($id)
    {
        return Inertia::render('Admin/UserForm', [
            'user' => User::findOrFail($id)
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required',
            'email' => "required|email|unique:users,email,{$id}",
            'role' => 'required'
        ]);

        $user->update($request->all());

        return redirect()->route('admin.users.index');
    }

    public function destroy($id)
    {
        User::destroy($id);
        return redirect()->route('admin.users.index');
    }
}

