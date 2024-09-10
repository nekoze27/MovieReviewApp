import React, { useState } from 'react'
import { Box, TextField, Button, Typography, Rating } from '@mui/material'
import laravelApiClient from '@/lib/laravelApiClient'

export default function ReviewForm({ addReview, onSubmit, movieId }) {
  const [reviewText, setReviewText] = useState('')
  const [rating, setRating] = useState(0)
  const [error, setError] = useState('')

  const handleSubmit = async () => {
    if (reviewText.trim()  === '' || rating === 0) {
      setError('レビューと評価は必須です')
      return
    }

    try {
      const response = await laravelApiClient.post(`api/reviews`, {
        review_text: reviewText,
        rating: rating,
        movie_id: movieId,
      });
      console.log(response.data);

      const newReview = response.data

      addReview(newReview)
      setReviewText('')
      setRating(0)
      onSubmit()
    } catch (error) {
      console.log(error)
    }
  };

  return (
    // <div style={{ backgroundColor: '#F3F4F6', padding: 4, }}>
      <Box sx={{ my: 4, p: 4, width: '80%', maxWidth: '600px', mx: 'auto', backgroundColor: '#FFF', }}>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
          レビューを投稿する
        </Typography>
        <Rating 
          name="simple-controlled" 
          value={rating} 
          onChange={(event, newValue) => setRating(newValue)}
          sx={{ fontSize: '40px' }} 
        />
        <TextField
          label="レビュー"
          multiline
          rows={4}
          variant="outlined"
          fullWidth 
          value={reviewText}
          onChange={e => setReviewText(e.target.value)}
          placeholder="ここにレビューを入力してください"
          sx={{ mt: 1 }}
        />
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
      )}
      <Button
        variant="outlined"
        // color="promary"
        onClick={handleSubmit}
        sx={{
          mt: 2,
          border: '1px solid #B5B5B5',
          color: '#333333',
          '&:hover': {
            backgroundColor: '#A0A0A0',
          },
        }}>
          レビュー投稿する
        </Button>
      </Box>
    // </div>
  )
}