<?php

use App\Http\Controllers\LikeController;
use App\Http\Controllers\ReviewController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// Route::post('/example', function (Request $request) {
//     return response()->json([
//         'message' => 'データが送信されました!',
//         'data' => $request->all()
//     ]);
// });

Route::get('/reviews', [ReviewController::class, 'index']);
Route::post('/reviews', [ReviewController::class, 'store']);
Route::delete('/reviews/{review}', [ReviewController::class, 'destroy']);

Route::get('/likes', [likeController::class, 'index']);
Route::post('/likes', [LikeController::class, 'toggleLike']);
Route::get('/likes/status', [LikeController::class, 'checkLikesStatus']);