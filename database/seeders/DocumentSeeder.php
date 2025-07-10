<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DocumentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (range(1, 5) as $i) {
            DB::table('documents')->insert([
                'title' => "InsightOps Document $i",
                'file_path' => "/storage/docs/sample-$i.pdf",
                'uploaded_by' => 1,
                'uploaded_at' => Carbon::now()
            ]);
        }
    }
}
