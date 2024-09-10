<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    use HasFactory;

    public function user() {
        return $this->belongsTo(user::class);
    }

    // 一括割り当てを許可するフィールド
    protected $fillable = [
        'review_text',
        'rating',
        'movie_id',
        'user_id',
    ];
}
