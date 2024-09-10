// import AppLayout from '@/components/Layouts/AppLayout'
// import Head from 'next/head'
// import React from 'react'
// import MovieDetail from './MovieDetail'
// import ReviewForm from '@/components/ReviewForm'

// export default function index({ movie }) {
//   return (
//     <AppLayout
//       header={
//         <h2 className="font-semibold text-xl text-gry-800 leading-tight">
//           Detail
//         </h2>
//       }>
//       <Head>
//         <title>Detail - MovieReview</title>
//       </Head>

//       <MovieDetail movie={movie} />
//       <ReviewForm />
//     </AppLayout>
//   )
// }

// export async function getServerSideProps(context) {
//   const { id } = context.params

//   try {
//     const responseJP = await fetch(
//       `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=ja-JP`,
//     )
//     const movieJP = await responseJP.json()

//     let overview = movieJP.overview

//     if (!overview) {
//       const responseEN = await fetch(
//         `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
//       )
//       const movieEN = await responseEN.json()
//       overview = movieEN.overview
//     }

//     return { props: { movie: { ...movieJP, overview } } }
//   } catch (error) {
//     console.error('Error fetching movie details:', error)
//     return { props: { movie: null } }
//   }
// }