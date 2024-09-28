import React, {useEffect, useState, useContext} from 'react';
import genreids from '../constants';
import {WatchListContext} from '../context/WatchListContext';

const allGenres = 'All Genres';
const getGenreName = (genre_id) => {
  return genreids[genre_id] || 'NA';
};

const WatchList = () => {
  const [searchedStr, setSearch] = useState('');
  const [genreList, setGenreList] = useState([allGenres, 'Action', 'Sci-Fi', 'Horror', 'Drama', 'Animation']);
  const [currentGenre, setCurrentGenre] = useState(allGenres);

  const {removeFromWatchList, watchlist, setWatchList} = useContext(WatchListContext);

  // to set genre filter options
  useEffect(() => {
    let tempArr = watchlist.map((movie) => {
      return getGenreName(movie.genre_ids[0]);
    });
    let temp = new Set(tempArr);
    setGenreList([allGenres, ...temp]);
  }, [watchlist]);

  // sort watchlist by Rating
  const handleAscRatings = () => {
    let ascWatchList = [...watchlist].sort((a, b) => a.vote_average - b.vote_average);
    setWatchList(ascWatchList);
  };

  const handleDescRatings = () => {
    let descWatchList = [...watchlist].sort((a, b) => b.vote_average - a.vote_average);
    setWatchList(descWatchList);
  };

  return (
    <>
      {/** search field */}
      <div className='flex justify-center my-5'>
        <input
          placeholder='Search movies'
          type='text'
          value={searchedStr}
          onChange={(e) => setSearch(e.target.value)}
          className='h-8 w-[600px] bg-gray-200 px-4 outline-none border border-slate-700'
        />
      </div>

      {/** Genres */}
      <div className='flex justify-center m-4'>
        {genreList.map((genre) => {
          return (
            <div
              className={
                currentGenre === genre
                  ? 'flex justify-center items-center bg-blue-400 h-8 w-20 text-white font-bold rounded-xl mx-2 cursor-pointer'
                  : 'flex justify-center items-center bg-gray-400 h-8 w-20 text-white  rounded-xl mx-2 cursor-pointer'
              }
              onClick={() => setCurrentGenre(genre)}
            >
              {genre}
            </div>
          );
        })}
      </div>

      {/** Watchlist table */}
      <div className='overflow-hidden rounded-lg border border-gray-200 shadow-md m-5'>
        <table className='w-full border-collapse bg-white text-left text-sm text-gray-500'>
          <thead>
            <tr className='bg-gray-50'>
              <th className='px-6 py-4 font-medium text-gray-900'>Name</th>
              <th>
                <div className='flex'>
                  <i className='fa-solid fa-arrow-up cursor-pointer pr-1' onClick={handleAscRatings}></i>
                  <div>Ratings</div>
                  <i className='fa-solid fa-arrow-down cursor-pointer pl-1' onClick={handleDescRatings}></i>
                </div>
              </th>
              <th>
                <div className='flex'>
                  <div>Popularity</div>
                </div>
              </th>
              <th>
                <div className='flex'>
                  <div>Genre</div>
                </div>
              </th>
              <th>
                <div className='flex'>
                  <div>Delete</div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100 border-t border-gray-100'>
            {watchlist
              .filter((movie) => {
                if (currentGenre === allGenres) {
                  return true;
                } else {
                  return currentGenre === getGenreName(movie.genre_ids[0]);
                }
              })
              .filter((movie) => movie.title.toLowerCase().includes(searchedStr.toLowerCase()))
              .map((movie) => {
                return (
                  <tr className='hover:bg-gray-50'>
                    <td className='flex items-center px-6 py-4 font-normal text-gray-900'>
                      <img className='h-[6rem] w-[10rem] object-fit' src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
                      <div className='font-medium text-gray-700 text-sm pl-4'>{movie.title}</div>
                    </td>
                    <td className='pl-6 py-4'>{movie.vote_average.toFixed(1)}</td>
                    <td className='pl-6 py-4'>{movie.popularity}</td>
                    <td className='pl-2 py-4'>{getGenreName(movie.genre_ids[0])}</td>
                    <td className='pl-2 py-4'>
                      <i className='fas fa-trash text-1xl cursor-pointer text-grey-500' onClick={() => removeFromWatchList(movie)}></i>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default WatchList;
