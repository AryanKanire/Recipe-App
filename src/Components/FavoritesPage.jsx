import React from 'react'
import RecipeCard from './RecipeCard';
import { getRandomColor } from '../lib/utiles';

function FavoritesPage() {
  const favorites=JSON.parse(localStorage.getItem("favorites")) || [];

  return (
    <div className='bg-[#faf9fb] flex-1 p-10 min-h-screen'>
      <div className='mx-auto max-w-screen-lg'>
        <p className='font-bold text-3xl md:text-5xl my-4'>My Favorites</p>

        {favorites.lenght===0 &&  (
          <div className='h-[80vh] flex flex-col items-center gap-4'>
              <img src="/404.svg" className='h-3/4' alt="404svg" />
          </div>
        )}

        
          <div className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {favorites.map((item,index)=>(
              <RecipeCard key={item.label} recipe={item} {...getRandomColor()}/>
            ))}
          </div>
        
      </div>
    </div>
  )
}

export default FavoritesPage