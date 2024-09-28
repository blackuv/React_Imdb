import { createContext, useState, useEffect } from "react";

const WatchListContext = createContext();
export { WatchListContext };

export default function WatchListContextWrapper(props){

    const [watchlist, setWatchList] = useState([]);

    //get watchlist from LocalStorage
    useEffect(() => {
        let moviesFromLS = localStorage.getItem('movies');
        if(moviesFromLS){
        setWatchList(JSON.parse(moviesFromLS));
        }
    }, []);


     //add movie to watchlist
    const addToWatchList = (movieObj) =>{
    const updatedMovies = [...watchlist, movieObj];
    setWatchList(updatedMovies);
    //update localstorage with watchlist movies
    localStorage.setItem('movies', JSON.stringify(updatedMovies));//only strings are allowed so we are stringify

  }

  //remove movie from watchlist
    const removeFromWatchList = (movieObj) =>{
    const filterdMovies = watchlist.filter((watchlistMovie) =>{
      return movieObj.id !== watchlistMovie.id;
    })
    setWatchList(filterdMovies);
    //update localstorage with removed movies from watchlist
    localStorage.setItem('movies', JSON.stringify(filterdMovies));
    }

    console.log(props.children, '[[props.children]]')
    return <WatchListContext.Provider
            value={{addToWatchList, removeFromWatchList, watchlist, setWatchList}}
            >
        {props.children}
    </WatchListContext.Provider>
}
