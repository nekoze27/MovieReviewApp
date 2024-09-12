import { Box, CircularProgress, Grid, Typography } from '@mui/material'
// import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import LikeButton from '@/components/LikeButton' 

// export default function MovieDetail() {
export default function MovieDetail({ movie }) {
  // const router = useRouter()
  // const { id } = router.query
  // const [movie, setMovie] = useState(null)
  // const [error, setError] = useState(null)

  // useEffect(() =>{
  //   const fetchMovieDetails = async () => {
  //     try {
  //       if (id) {
  //         const response = await fetch(`/api/movie/${id}`)
  //         if (!response.ok) {
  //           throw new Error(
  //             `HTTP error! status: ${response.status}`,
  //           )
  //         }
  //         const data = await response.json()
  //         setMovie(data)
  //       }
  //     } catch (error) {
  //       console.error('Error fetching movie details:', error)
  //       setError(error.message)
  //     }
  //   }
  //   fetchMovieDetails()
  // }, [id])

  if (!movie) {
    return <CircularProgress />
  }

  return (
    <Box py={3}>
      <Box maxWidth="lg" mx="auto">
        <Grid container spacing={3} sx={{ p: '30px' }}>
          <Grid item xs={12} md={5}>
            <img
              src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
              alt={movie.title || movie.original_title}
              style={{ width: '100%', maxHeight: '500px', objectFit: 'contain',
              }}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" fontWeight="bold" sx={{ mt: '50px' }}>
              {movie.title || movie.original_title}
            </Typography>
            <Typography variant="subtitle1" sx={{ mt: '30px' }}>
              {movie.overview || 'あらすじがありません。'}
            </Typography>
            <Grid item sx={{ texAlign: 'right' }}>
              <LikeButton movieId={movie.id} />
            </Grid>
            <Typography variant="body1" component="p" sx={{ mt: '10px' }}>
              公開日: {movie.release_date}
            </Typography>
            <Typography variant="body1" component="p" sx={{ mt: '10px' }}>
              ジャンル: {movie.genres.map(genre => genre.name).join(', ')}
            </Typography>
            <Typography variant="body1" component="p" sx={{ mt: '10px' }}>
              ホームページ: <a href={movie.homepage} target="_blank" rel="noopener noreferrer">{movie.homepage}</a>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}