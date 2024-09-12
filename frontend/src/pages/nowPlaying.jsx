import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export default function TopRated() {
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]) // 上映中映画リスト用のstate
  const [error, setError] = useState(null) // エラーハンドリング用のstate
  const router = useRouter()

  // 映画詳細ページへ移動
  const handleClick = (id) => {
    router.push(`/detail/movie/${id}`)
  }

  // TMDB APIから上映中映画データを取得
  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await fetch('/api/getNowPlayingMovies') 
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json() // レスポンスをJSONに変換
        setNowPlayingMovies(data.results) // データをStateに保存
      } catch (error) {
        console.error('Error fetching top rated movies:', error)
        setError(error.message)
      }
    }

    fetchTopRatedMovies()
  }, [])

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          日本で上映中の映画
        </h2>
      }>
      <Head>
        <title>日本で上映中の映画 - MovieReview</title>
      </Head>

      <Box py={3} px={5}>
        <Box maxWidth="lg" mx="auto">
          {/* 上映中映画リスト */}
          <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={2}>
            {nowPlayingMovies.map((movie) => (
              <Card key={movie.id}>
                <CardActionArea onClick={() => handleClick(movie.id)}>
                  <CardMedia
                    component="img"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" noWrap>
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