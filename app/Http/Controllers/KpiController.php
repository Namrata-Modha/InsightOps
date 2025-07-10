<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class KpiController extends Controller
{
    /**
     * Display the KPIs page for analysts.
     *
     * @return \Inertia\Response
     */
    public function index()
{
    $activeUsers = DB::table('sessions')
        ->select(DB::raw('COUNT(DISTINCT user_id) as count'))
        ->first()->count ?? 0;

    $logCount = DB::table('access_logs')->count();

    // Group logins by day (last 7 days)
    $logins = DB::table('access_logs')
        ->selectRaw("DATE(login_at) as date, COUNT(*) as count")
        ->where('login_at', '>=', Carbon::now()->subDays(6))
        ->groupBy('date')
        ->orderBy('date')
        ->get();

    return Inertia::render('Analyst/KPIs', [
        'uptime' => '99.97%',
        'activeUsers' => $activeUsers,
        'logCount' => $logCount,
        'loginsOverTime' => $logins,
    ]);
}
}
