import AppLayout from '@/components/Layouts/AppLayout'
import MovieList from '@/components/MovieList'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Search from '../components/Search'

const Dashboard = () => {
    const [movies, setMovies] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const handleSearch = query => {
        setSearchQuery(query)
    }

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('api/getNowPlayingMovies')
                if ( !response.ok) {
                    throw new Error('Network response was not ok')
                }
                const data = await response.json()
                setMovies(data.results)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchMovies()
    }, [])

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    ダッシュボード
                </h2>
            }>
            <Head>
                <title>Laravel - Dashboard</title>
            </Head>

            {/* <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div> */}

            <Search onSearch={handleSearch} />

            <MovieList title="上映中の映画" movies={movies} />
        </AppLayout>
    )
}

export default Dashboard
