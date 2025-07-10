<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\AccessLog;
use App\Models\AuditTrail;
use Symfony\Component\HttpFoundation\StreamedResponse;

class LogController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $from = $request->input('from');
        $to = $request->input('to');

        $accessLogs = AccessLog::when($search, function ($query, $search) {
                $query->where('ip_address', 'like', "%$search%");
            })
            ->when($from && $to, function ($query) use ($from, $to) {
                $query->whereBetween('login_at', [$from, $to]);
            })
            ->orderByDesc('login_at')
            ->paginate(5)
            ->withQueryString();

        $auditLogs = AuditTrail::when($search, function ($query, $search) {
                $query->where('module', 'like', "%$search%")
                    ->orWhere('action', 'like', "%$search%");
            })
            ->when($from && $to, function ($query) use ($from, $to) {
                $query->whereBetween('created_at', [$from, $to]);
            })
            ->orderByDesc('created_at')
            ->paginate(5)
            ->withQueryString();

        return Inertia::render('Analyst/Logs', [
            'accessLogs' => $accessLogs,
            'auditLogs' => $auditLogs,
            'filters' => [
                'search' => $search,
                'from' => $from,
                'to' => $to,
            ]
        ]);
    }

    public function export()
    {
        $filename = 'access_logs_' . now()->format('Y-m-d_H-i') . '.csv';

        $logs = AccessLog::select('user_id', 'ip_address', 'login_at', 'logout_at')->get();

        $response = new StreamedResponse(function () use ($logs) {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['User ID', 'IP Address', 'Login Time', 'Logout Time']);
            foreach ($logs as $log) {
                fputcsv($handle, [
                    $log->user_id,
                    $log->ip_address,
                    $log->login_at,
                    $log->logout_at
                ]);
            }
            fclose($handle);
        });

        $response->headers->set('Content-Type', 'text/csv');
        $response->headers->set('Content-Disposition', "attachment; filename=\"$filename\"");

        return $response;
    }

}

