import { Box, Card, CardContent, Typography, Button, IconButton, Modal, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import StarIcon from '@mui/icons-material/Star'
import ReviewForm from './ReviewForm'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import laravelApiClient from '@/lib/laravelApiClient'
import { useAuth } from '@/hooks/auth'

export default function MovieReviews({ movieId }) {
  const [reviews, setReviews] = useState([])
  const [open, setOpen] = useState(false)
  const { user } = useAuth({ middleware: 'auth' })
  // console.log('Logged in user:', user) //デバック

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/reviews?movie_id=${movieId}`,
        )
        const data = await response.json()
        // console.log('Fetched reviews:', error) //デバック
        setReviews(data)
      } catch (error) {
        console.error('Error fetching reviews:', error)
      }
    }

    fetchReviews()
  }, [movieId])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const addReview = newReview => {
    // 新しいレビューを既存のreviews配列に追加
    setReviews([...reviews, newReview.review])
  }

  const handleDelete = async id => {
    // console.log(`Deleting review with id: ${id}`) //デバック
    if (window.confirm('このレビューを削除してもよろしいでしょうか？')) {
      try {
        const response = await laravelApiClient.delete(
          `api/reviews/${id}`,
        )
        console.log('Delete response:', response) //デバック
        const filterdReviews = reviews.filter(
          review => review.id !== id,
        )
        setReviews(filterdReviews)
      } catch (error) {
        console.error('Error deleting review:', error) //デバック
      }
    }
  }

  return (
    <div style={{ backgroundColor: '#FFF', padding: '50px', }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
          <Button variant="contained" onClick={handleOpen} starIcon={<AddIcon />}
            size="large"
            sx={{ border: '1px solid #B5B5B5', borderRadius: '50px', color: '#333333', '&:hover': {
              backgroundColor: '#A0A0A0',
            }, fontWeight: 'bold',
            }}>
            レビューを投稿する
          </Button>
      </div>
      {/* レビュー投稿フォームのモーダル */}
      <Modal open={open} onClose={handleClose}>
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '800px',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '10px',
           }}
        >
          {/* 閉じるボタン */}
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              padding: '10px',
              '& .MuiSvgIcon-root': {
                fontSize: '2rem',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
          <ReviewForm
            addReview={addReview} 
            onSubmit={handleClose} 
            movieId={movieId}
          />
        </Box>
      </Modal>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 4, }}>
        {reviews.map(review => (
          <Card
            key={review.id}
            sx={{ maxWidth: 800, margin: 'auto', width: '80%', p: '10px', }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', }}>
                  <Typography variant="h6" component="div">
                    {review.user.name}
                  </Typography>
                  {/* {console.log('review User ID:', review.user.id)} デバック */}
                  {/* {console.log('Logged In User ID:', user?.id)} デバック */}
                  {/* 削除ボタン */}
                  {review.user.id === user?.id && (
                    <IconButton
                      onClick={() => handleDelete(review.id)}
                      sx={{ color: 'red',
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 1, }}>
                  {[...Array(review.rating)].map((_, index) => (
                    <StarIcon
                      key={index}
                      color="primary"
                      sx={{ fontSize: '40px' }}
                    />
                  ))}
                  {[...Array(5 - review.rating)].map((_, index) => (
                    <StarIcon
                      key={index}
                      color="disabled"
                      sx={{ fontSize: '40px' }}
                    />
                  ), )}
                  <Typography variant="body1" sx={{ marginLeft: 1 }}>
                    ({review.rating}/5)
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '20px', mt: '10px' }}>
                  {review.review_text}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1, textAlign: 'right' }}>
                  {new Date(review.created_at).toLocaleString()}{' '}
                </Typography>
              </CardContent>
            </Card>
        ))}
      </Box>
    </div>
  )
}