<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Document;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * DocumentController handles document management for analysts.
 * It allows uploading, viewing, and searching documents.
 */

class DocumentController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $documents = Document::when($search, function ($query, $search) {
                $query->where('title', 'like', "%$search%");
            })
            ->orderByDesc('id')
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Analyst/Documents', [
            'documents' => $documents,
            'filters' => [
                'search' => $search,
            ]
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'file' => 'required|mimes:pdf,docx,xlsx,jpg,png|max:10240',
        ]);

        $path = $request->file('file')->store('documents', 'public');

        Document::create([
            'title' => $request->title,
            'file_path' => Storage::url($path),
            'uploaded_by' => auth()->id(),
        ]);

        return redirect()->route('analyst.documents')->with('success', 'Document uploaded successfully!');
    }

    public function export()
    {
        $filename = 'documents_' . now()->format('Y-m-d_H-i') . '.csv';

        $documents = Document::select('title', 'file_path', 'uploaded_by')->get();

        $response = new StreamedResponse(function () use ($documents) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['Title', 'File Path', 'Uploaded By']);
            foreach ($documents as $doc) {
                fputcsv($handle, [
                    $doc->title,
                    $doc->file_path,
                    $doc->uploaded_by
                ]);
            }
            fclose($handle);
        });

        $response->headers->set('Content-Type', 'text/csv');
        $response->headers->set('Content-Disposition', "attachment; filename=\"$filename\"");

        return $response;
    }

    
}

