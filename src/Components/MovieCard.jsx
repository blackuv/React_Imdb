import React from 'react'

export const MovieCard = (movie) => {
  console.log(movie);//{index, addToWatchlist, and all other movie obj props}
  //destructuring props
  const {addToWatchList, removeFromWatchList, movieObj, index, title, watchlist, id} = movie;

  const isMovieInList = () =>{
    //if id is present in list then return true else false
    for(let i = 0; i < watchlist.length; i++){
      if(watchlist[i].id === movieObj.id)
        return true; 
    }
    return false;
  }
  return (
    <>
    <div className='flex justify-evenly flex-wrap gap-6'>
     
          <div className='h-[40vh] w-[200px] bg-center bg-cover rounded-xl flex flex-col justify-end item-end hover:scale-110 duration-200 hover:cursor-pointer relative' 
          style={{backgroundImage: `url(https://image.tmdb.org/t/p/original${movieObj.backdrop_path})`}} >
             {
              isMovieInList()?(
                <div className='absolute top-0 right-0 text-white font-bold p-2 '>
                <i className="fas fa-heart text-2xl text-red-500" onClick={()=>removeFromWatchList(movieObj)}></i> {/* Font Awesome heart icon */}
              </div>
              ):(
                <div className='absolute top-0 right-0 text-white font-bold p-2 '>
                  <i className="fas fa-heart text-2xl " onClick={()=>addToWatchList(movieObj)}></i> {/* Font Awesome heart icon */}
                </div>
              )
             }
              

            <div className='text-white w-full text-center font-bold p-2 rounded-lg bg-gray-900/60'>{movieObj.title}</div>
          </div>
          
      
    </div>
    
    </>
  )
}

export default MovieCard


{/*
<div className='text-3xl font-bold text-center m-4'>
    <h2>Trending Movies:</h2>
    </div>
    
    <div className='flex justify-evenly flex-wrap gap-6'>
      {movies.map((movie, key) => {
        return (
          <div className='h-[40vh] w-[200px] bg-center bg-cover rounded-xl flex flex-col justify-between item-end hover:scale-110 duration-200 hover:cursor-pointer' 
          style={{backgroundImage: `url(${movie.url})`}} >
            <div className='text-white w-full text-center p-2 rounded-lg bg-gray-900/50'>{movie.title}</div>
          </div>
        )
      })}
    </div>

*/}
