import Navbar from "./Components/Navbar"
import Home from "./Components/Home" 
import WatchList from "./Components/WatchList"
import { Fragment } from "react"
import { Route, Routes } from "react-router-dom"
import './App.css'
import WatchListContextWrapper from "./context/WatchListContext"
import {Provider} from 'react-redux'
import store from "./redux/store" 

function App() {

  return (
    <Provider store={store}>
    <Fragment>
     <Navbar/>
      <WatchListContextWrapper>
     <Routes>
          <Route path='/' element={<Home></Home>}/>
          <Route path='/watchlist' element={<WatchList></WatchList>}/>
     </Routes>
     </WatchListContextWrapper>
    </Fragment>
    </Provider>
  )
}

export default App