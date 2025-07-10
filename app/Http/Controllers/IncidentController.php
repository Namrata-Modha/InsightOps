<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class IncidentController extends Controller
{
    public function index()
    {
        return Inertia::render('Incidents/Incidents');
    }
}
