import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/imdb.png'


const Navbar = () => {
  return (
    <div className='flex space-x-8 items-center pl-3 py-4'>
        <Link to='/'>
            <img className='w-[60px]' src={Logo}/>
        </Link>
        <Link to='/' className='text-blue-400 text-3xl font-bold'>
            Movies
        </Link>
        <Link to='/watchlist' className='text-blue-400 text-3xl font-bold'>
            WatchList
        </Link>
    </div>
  )
}

export default Navbar