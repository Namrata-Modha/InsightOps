
<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\IncidentController;
use App\Http\Controllers\AnalystController;
use App\Http\Controllers\LogController;
use App\Http\Controllers\KpiController;
use App\Http\Controllers\DocumentController;

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
    if (auth()->user()->role === 'analyst') {
        return redirect()->route('analyst.dashboard');
    }
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile management routes - allow authenticated users to edit, update, or delete their profile.
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::patch('/profile/update', [ProfileController::class, 'updateAnalyst'])->name('analyst.profile.update');

});

// Incident management route - allows admin users to view incidents.
Route::get('/incidents', [IncidentController::class, 'index'])->middleware(['auth', \App\Http\Middleware\RoleMiddleware::class]);

Route::middleware(['auth', \App\Http\Middleware\RoleMiddleware::class . ':analyst'])->group(function () {
    Route::get('/analyst/dashboard', [AnalystController::class, 'index'])->name('analyst.dashboard');
    Route::get('/analyst/logs', [LogController::class, 'index'])->name('analyst.logs');
    Route::get('/analyst/kpis', [KpiController::class, 'index'])->name('analyst.kpis');
    Route::get('/analyst/documents', [DocumentController::class, 'index'])->name('analyst.documents');
    Route::post('/analyst/documents/upload', [DocumentController::class, 'store'])->name('analyst.documents.upload');
    Route::get('/analyst/logs/export', [LogController::class, 'export'])->name('analyst.logs.export');
    Route::get('/analyst/documents/export', [DocumentController::class, 'export'])->name('analyst.documents.export');
});

require __DIR__.'/auth.php';
