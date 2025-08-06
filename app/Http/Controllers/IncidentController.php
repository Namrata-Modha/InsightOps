<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Incident;
use Illuminate\Support\Facades\Auth;

class IncidentController extends Controller
{
    public function index()
    {
        return Inertia::render('Analyst/Incidents', [
            'incidents' => Incident::where('reported_by', Auth::id())->latest()->paginate(10)
        ]);
    }

    public function create()
    {
        return Inertia::render('Analyst/ReportIncident');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        Incident::create([
            'title' => $request->title,
            'description' => $request->description,
            'reported_by' => Auth::id()
        ]);

        audit('created', 'Incident', 'Reported incident: ' . $incident->title);

        return redirect()->route('analyst.incidents.index')->with('success', 'Incident reported successfully.');
    }
    public function edit($id)
    {
        $incident = Incident::where('id', $id)
            ->where('reported_by', Auth::id())
            ->firstOrFail();

        return Inertia::render('Analyst/EditIncident', [
            'incident' => $incident
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);

        $incident = Incident::where('id', $id)
            ->where('reported_by', Auth::id())
            ->firstOrFail();

        $incident->update([
            'title' => $request->title,
            'description' => $request->description
        ]);

        audit('updated', 'Incident', 'Edited incident: ' . $incident->title);

        return redirect()->route('analyst.incidents.index')->with('success', 'Incident updated successfully.');
    }

    public function destroy($id)
    {
        $incident = Incident::where('id', $id)
            ->where('reported_by', Auth::id())
            ->firstOrFail();

        $incident->delete();

        audit('deleted', 'Incident', 'Deleted incident: ' . $title);

        return redirect()->route('analyst.incidents.index')->with('success', 'Incident deleted successfully.');
    }


}

