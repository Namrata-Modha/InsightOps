<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Document;
use App\Models\AccessLog;

class AdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'totalUsers' => User::count(),
            'totalDocuments' => Document::count(),
            'totalLogs' => AccessLog::count(),
            'uptime' => '99.97%'
        ]);
    }
}

