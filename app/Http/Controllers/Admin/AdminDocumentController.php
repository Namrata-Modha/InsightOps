<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Document;
use Symfony\Component\HttpFoundation\StreamedResponse;
use Illuminate\Http\Request;

class AdminDocumentController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $from = $request->input('from');
        $to = $request->input('to');

        $documents = Document::when($search, function ($query, $search) {
                $query->where('title', 'like', "%$search%");
            })
            ->when($from && $to, function ($query) use ($from, $to) {
                $query->whereBetween('uploaded_at', [$from, $to]);
            })
            ->orderByDesc('id')
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Admin/Documents', [
            'documents' => $documents,
            'filters' => [
                'search' => $search,
                'from' => $from,
                'to' => $to,
            ]
        ]);
    }


    public function destroy($id)
    {
        Document::destroy($id);
        return redirect()->route('admin.documents');
    }

    public function export(Request $request)
    {
        $search = $request->input('search');
        $from = $request->input('from');
        $to = $request->input('to');

        $documents = Document::when($search, function ($query, $search) {
                $query->where('title', 'like', "%$search%");
            })
            ->when($from && $to, function ($query) use ($from, $to) {
                $query->whereBetween('uploaded_at', [$from, $to]);
            })
            ->orderByDesc('id')
            ->get();

        $filename = 'admin_documents_' . now()->format('Y-m-d_H-i') . '.csv';

        $response = new \Symfony\Component\HttpFoundation\StreamedResponse(function () use ($documents) {
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

