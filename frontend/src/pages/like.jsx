import AppLayout from '@/components/Layouts/AppLayout'
import laravelApiClient from '@/lib/laravelApiClient'
import { Card, CardMedia, CardActionArea, CardContent, Grid, Link, Box, Typography } from '@mui/material'
import Head from 'next/head'
import React from 'react'
import useSWR from 'swr'

function like() {
  const fetcher = url => laravelApiClient.get(url).then(res => res.data)
  const { data: likeItems, error } = useSWR('api/likes', fetcher)

  console.log(likeItems)

  if (error) {
    return <div>エラーが発生しました</div>
  }
  
  return (
    <AppLayout
      header={
        <h2 className="font-semibold text-xl text-gray-800 leading-tight">
          いいねした映画
        </h2>
      }>
        <Head>
          <title>いいねした映画 - MovieReview</title>
        </Head>
        
        {/* <Box py={3} px={5}>
          <Box maxWidth="lg" mx="auto">
            <Grid container spacing={3} >
              {likeItems?.map(item => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <Link href={`/detail/movie/${item.id}`} underline="none">
                    <Card sx={{ 
                      maxWidth: 345, 
                      height: 380, 
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between', 
                    }}>
                      <CardMedia component="img" height="400" image={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} sx={{ objectFit: 'cover' }}/>
                    </Card>
                    <Typography variant="h6" fontWeight="bold" sx={{ mx: 2, mt: 2, textAlign: 'center' }}>
                      {item.title}
                    </Typography>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box> */}
        <Box py={3} px={5}>
          <Box maxWidth="lg" mx="auto">
            {/* いいねした映画のリスト */}
            <Box display="grid" gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={2}>
              {likeItems?.map((item) => (
                <Card key={item.id}>
                  <CardActionArea onClick={() => handleClick(item.id)}>
                    <CardMedia
                      component="img"
                      image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={item.title}
                      sx={{ objectFit: 'cover', height: '400px' }}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {item.title}
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

export default like