<?php

namespace App\Http\Controllers;

use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Review::with('user');
        
        if ($request->has('movie_id')) {
            $query->where('movie_id', $request->query('movie_id'));
        }

        $reviews = $query->get();
        return response()->json($reviews);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // バリデーション
            $validatedData = $request->validate([
                'review_text' => 'required | string | max:255',
                'movie_id' => 'required | integer',
                'rating' => 'required | integer | min: 1 | max: 5',
            ]);

            // 新しいレビューの作成
            $review = Review::create([
                'user_id' => Auth::id(),
                'movie_id' => $validatedData['movie_id'],
                'review_text' => $validatedData['review_text'],
                'rating' => $validatedData['rating'],
            ]);

            // 作成されたレビューをユーザー情報と共に再取得
            $reviewWithUser = Review::with('user')->find($review->id);

            // レスポンスにユーザー情報を含めて返す
            return response()->json([
                'message' => 'Review saved successfully!',
                'review' => $reviewWithUser
            ], 201);
        } catch (\Exception $e) {
            // 何らかのエラーが発生した場合のレスポンス
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Review $review)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Review $review)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Review $review)
    {
        $review->delete();

        return response()->json(["message" => "The review has been successfully deleted."]);
    }
}
