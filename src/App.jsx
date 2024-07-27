import React from 'react'
import Sidebar from './Components/Sidebar'
import { Routes , Route } from 'react-router-dom'
import FavoritesPage from './Components/FavoritesPage'
import HomePage from './Components/HomePage'

function App() {
  return (
    <div className='flex'>
      <Sidebar/>
      <Routes>
        <Route path='/'element ={<HomePage/>}/>
        <Route path='/favorites'element ={<FavoritesPage/>}/>
      </Routes>
    </div>
  )
}

export default App