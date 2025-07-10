<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccessLog extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'user_id',
        'ip_address',
        'login_at',
        'logout_at',
    ];
}
