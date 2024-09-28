import React, {useState} from 'react';
import Navbar from './Navbar';
import Pagination from './Pagination';
import MovieCard from './MovieCard';
import Banner from './Banner';
import { useEffect, useContext } from 'react';
import axios from 'axios';
import { WatchListContext}  from '../context/WatchListContext'
import { useSelector, useDispatch } from 'react-redux'
import { handleNext, handlePrev } from '../redux/paginationSlice';


function Movies(){
  const [movies, setMovies] = useState([]);

  //const [pageNo, setPageNo] = useState(1);
  const { pageNo } = useSelector((state) => state.pagination);
  const dispatch = useDispatch();

 // const [watchlist, setWatchList] = useState([]);

  const {addToWatchList, removeFromWatchList, watchlist, setWatchList} = useContext(WatchListContext);

    //get data from API
      useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=0af167889685397a8719ce5660ed8b86&language=en-US&page=${pageNo}`)
        .then(function (response) {
        // handle success
        console.log('Movies List in home:', response.data.results, 'PageNo: ', pageNo);

        setMovies(response.data.results)

        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
        .finally(function () {
        // always executed
        });
    }, [pageNo])

    //get watchlist from localStorage
    useEffect(() => {
      //on page load, set the watchlist from LS
      const watchListMovies = localStorage.getItem('movies');
      if(watchListMovies){
        setWatchList(JSON.parse(watchListMovies));//in LS data is in string format, so convert it
      }
    }, []);

    //next page
  const goToNextPage = ()=>{
    //inc pgno
    dispatch(handleNext())
  }

  //previous page
  const goToPrevPage = ()=>{
    //dec pgno
    dispatch(handlePrev())
  }

  //add movie to watchlist
  /*const addToWatchList = (movieObj) =>{
    const updatedMovies = [...watchlist, movieObj];
    setWatchList(updatedMovies);
    //update localstorage with watchlist movies
    localStorage.setItem('movies', JSON.stringify(updatedMovies));//only strings are allowed so we are stringify

  }*/

  //remove movie from watchlist
  /*const removeFromWatchList = (movieObj) =>{
    const filterdMovies = watchlist.filter((watchlistMovie) =>{
      return movieObj.id !== watchlistMovie.id;
    })
    setWatchList(filterdMovies);
    //update localstorage with removed movies from watchlist
    localStorage.setItem('movies', JSON.stringify(filterdMovies));
  }*/

  return(
    <>
    <div className='text-3xl font-bold text-center m-4'>
    <h2>Trending Movies:</h2>
    </div>
    <div className='flex justify-evenly flex-wrap gap-6'>
      {movies.map((movieObj, index) => <MovieCard 
      movieObj={movieObj} 
      index={index} 
      watchlist={watchlist} 
      addToWatchList={addToWatchList}
      removeFromWatchList={removeFromWatchList}
      />)}
    </div>


        {/*for pagination*/}
        <Pagination 
        handleNext={goToNextPage} 
        handlePrev={goToPrevPage} 
        pageNo={pageNo}/>
    
    </>
  )
  
}

const Home = () => {
  return (
    <div>
      Home Page
      <Banner />
      <Movies/>
    </div>
  );
}

export default Home;
