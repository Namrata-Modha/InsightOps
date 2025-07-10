<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\AuditTrail;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AnalystController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $activityChart = DB::table('audit_trails')
        ->selectRaw("DATE(created_at) as date, COUNT(*) as count")
        ->where('user_id', $user->id)
        ->where('created_at', '>=', Carbon::now()->subDays(6))
        ->groupBy('date')
        ->orderBy('date')
        ->get();
        
        $recentActivity = AuditTrail::where('user_id', $user->id)
            ->orderByDesc('created_at')
            ->take(5)
            ->get();

        return Inertia::render('AnalystDashboard', [
            'user' => $user,
            'recentActivity' => $recentActivity,
            'activityChart' => $activityChart,
        ]);
    }
}
