<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AuditTrailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $modules = ['Auth', 'Documents', 'Users', 'Settings'];
        $actions = ['viewed', 'updated', 'deleted', 'created'];

        foreach (range(1, 10) as $i) {
            DB::table('audit_trails')->insert([
                'user_id' => 1,
                'action' => $actions[array_rand($actions)],
                'module' => $modules[array_rand($modules)],
                'details' => 'Performed some action',
                'created_at' => Carbon::now(),
            ]);
        }
    }
}
