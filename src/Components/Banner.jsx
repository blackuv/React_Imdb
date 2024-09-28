import React, {useState} from 'react'
import { useEffect } from 'react';
import axios from 'axios';

const Banner = () => {
    const [bannerImg, setBannerImg] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=0af167889685397a8719ce5660ed8b86&language=en-US&page=1`)
        .then(function (response) {
        // handle success
        console.log('Movies', response.data.results);
        const firstMovie = response.data.results[0];
        const firstMovieTitle = firstMovie.title;
        const firstMovieImg = firstMovie.backdrop_path;

        setTitle(firstMovieTitle);
        setBannerImg(`https://image.tmdb.org/t/p/original${firstMovieImg}`);

        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
        .finally(function () {
        // always executed
        });
    }, [])

  return (
    <>
        <div className='h-[20vh] md:h-[75vh] bg-cover bg-center flex items-end'
            style={{ backgroundImage: `url(${bannerImg})` }}>
        <div className='text-white w-full text-center text-6xl pb-6 font-bold'>{title}</div>
        </div>
    </>
  )
}

export default Banner