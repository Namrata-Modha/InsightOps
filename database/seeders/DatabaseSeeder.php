<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\AccessLogSeeder;
use Database\Seeders\AuditTrailSeeder;
use Database\Seeders\DocumentSeeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            AccessLogSeeder::class,
            AuditTrailSeeder::class,
            DocumentSeeder::class,
        ]);
    }
}
