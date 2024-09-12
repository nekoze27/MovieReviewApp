import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, CircularProgress, Card, CardActionArea, CardMedia, CardContent, Grid, Typography } from '@mui/material'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import Search from '@/components/Search'
import Link from 'next/link'

export default function SearchResults() {
  const router = useRouter()
  const { query } = router.query
  const [loading, setLoading] = useState(true)
  const [movies, setMovies] = useState([])
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = query => {
    setSearchQuery(query)
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `/api/getSearchResults?query=${query}`,
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setMovies(data.results)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching movies:', error)
        setLoading(false)
      }
    }

    if (query) {
      fetchMovies()
    }
  }, [query])

  if (loading) {
    return <CircularProgress />
  }

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          検索結果
        </h2>
      }>
      <Head>
        <title>検索結果 - MovieReviw</title>
      </Head>

      <Search onSearch={handleSearch} />
      <Box py={3} px={5}>
        <Box maxWidth="lg" mx="auto">
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 3 }}>
            検索結果: {query}
          </Typography>

          {/* <Grid container spacing={3}>
            {movies.map(movie => (
              <Grid item xs={12} sm={6} md={4} key={movie.id}>
                <Link href={`/detail/movie/${movie.id}`} passHref>
                  <Box sx={{ display: 'flex', flexFlow: 'column', }}>
                    <img
                      src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt={movie.title}
                      style={{ width: 'auto', height: '500px', objectFit: 'cover', }} 
                    />
                    <Typography variant="h6" fontWeight="bold" sx={{ mx: 2 }}>
                      {movie.title}
                    </Typography>
                  </Box>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Box> */}
        <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={2}>
            {movies.map((movie) => (
              <Card key={movie.id}>
                <CardActionArea component={Link} href={`/detail/movie/${movie.id}`}>
                  <CardMedia
                    component="img"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    sx={{ height: '300px', objectFit: 'cover' }}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {movie.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      公開日: {movie.release_date} 
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </AppLayout>
  )
}