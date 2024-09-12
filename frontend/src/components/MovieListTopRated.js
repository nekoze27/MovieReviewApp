import React from 'react'
import {
  Box,
  Typography,
  List,
  ListItem,
  Card,
  CardContent,
  CardActionArea,
  CardMedia,
} from '@mui/material'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { NextArrow, PrevArrow } from './Arrows'
import styles from '@emotion/styled'
import { useRouter } from 'next/router'

export default function MovieList({ title, topRatedMovies }) {
  const router = useRouter()

  const handleClick = id => {
    router.push(`/detail/movie/${id}`)
  }
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll:3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1440, 
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  return (
    // <Box py={3}>
    //   <Box maxWidth="lg" mx="auto">
    //     <Card>
    //       <CardContent>
    //         <Typography variant="h5" compornent="h3" fontWeight="bold">{title}</Typography>
    //         <List>
    //           {movies.map(movie => (
    //             <ListItem key={movie.id} sx={{ mt: 2}}>
    //               <Box>
    //                 <img
    //                   src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
    //                 />
    //                 <Typography variant="h6" fontWeight="bold">
    //                   {movie.title}
    //                 </Typography>
    //               </Box>
    //             </ListItem>
    //           ))}
    //         </List>
    //       </CardContent>
    //     </Card>
    //   </Box>
    // </Box>

    <Box py={3}>
      <Box maxWidth="lg" mx="auto">
        <Card>
          <CardContent sx={{ padding: '24px' }}>
            <Typography variant="h5" component="h3" fontWeight="bold">{title}</Typography>
            <Slider {...settings}>
              {topRatedMovies.map(movie => (
                <Card key={movie.id} sx={{ mt: 2 }}>
                  <CardActionArea 
                    onClick={() => handleClick(movie.id)}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', }}>
                    <CardMedia
                      component="img"
                      image={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                      alt={movie.title}
                      sx={{ objectFit: 'contain', maxHeight: '300px', }}
                    />
                  </CardActionArea>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" textAlign="center" noWrap>
                      {movie.title}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Slider>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}