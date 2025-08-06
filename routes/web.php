
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
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\AdminLogController;
use App\Http\Controllers\Admin\AdminDocumentController;
use App\Http\Middleware\RoleMiddleware;


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
    Route::get('/analyst/incidents', [IncidentController::class, 'index'])->name('analyst.incidents.index');
    Route::get('/analyst/incidents/create', [IncidentController::class, 'create'])->name('analyst.incidents.create');
    Route::post('/analyst/incidents', [IncidentController::class, 'store'])->name('analyst.incidents.store');
    Route::get('/analyst/incidents/{id}/edit', [IncidentController::class, 'edit'])->name('analyst.incidents.edit');
    Route::patch('/analyst/incidents/{id}', [IncidentController::class, 'update'])->name('analyst.incidents.update');
    Route::delete('/analyst/incidents/{id}', [IncidentController::class, 'destroy'])->name('analyst.incidents.destroy');

});

Route::middleware(['auth', RoleMiddleware::class . ':admin'])->group(function () {
    // Admin Dashboard
    Route::get('/admin/dashboard', [AdminController::class, 'index'])->name('admin.dashboard');

    // User Management
    Route::get('/admin/users', [UserController::class, 'index'])->name('admin.users.index');
    Route::get('/admin/users/create', [UserController::class, 'create'])->name('admin.users.create');
    Route::post('/admin/users', [UserController::class, 'store'])->name('admin.users.store');
    Route::get('/admin/users/{id}/edit', [UserController::class, 'edit'])->name('admin.users.edit');
    Route::patch('/admin/users/{id}', [UserController::class, 'update'])->name('admin.users.update');
    Route::delete('/admin/users/{id}', [UserController::class, 'destroy'])->name('admin.users.destroy');

    // Logs
    Route::get('/admin/logs', [AdminLogController::class, 'index'])->name('admin.logs');
    Route::get('/admin/logs/export', [AdminLogController::class, 'export'])->name('admin.logs.export');

    // Documents
    Route::get('/admin/documents', [AdminDocumentController::class, 'index'])->name('admin.documents');
    Route::delete('/admin/documents/{id}', [AdminDocumentController::class, 'destroy'])->name('admin.documents.destroy');
    Route::get('/admin/documents/export', [AdminDocumentController::class, 'export'])->name('admin.documents.export');
});

require __DIR__.'/auth.php';
