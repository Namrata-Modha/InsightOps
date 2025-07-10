
<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\IncidentController;

/**
 * Web Routes for the InsightOps application.
 *
 * This file defines all the web routes for the application, including
 * public, authenticated, and admin-only routes. It also loads authentication routes.
 */

// Landing page route - renders the Welcome page with some environment info.
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Dashboard route - renders the Dashboard page, requires authentication and email verification.
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile management routes - allow authenticated users to edit, update, or delete their profile.
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Incident management route - allows admin users to view incidents.
Route::get('/incidents', [IncidentController::class, 'index'])->middleware(['auth', \App\Http\Middleware\RoleMiddleware::class]);

require __DIR__.'/auth.php';
