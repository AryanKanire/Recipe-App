import { Heart, HeartPulse, Soup } from 'lucide-react'
import React, { useState } from 'react'

const gettwovalue = (arr)=>{
  return [arr[0] ,arr[1]];
}

function RecipeCard({recipe , bg, badge}) {

  const healthlabel = gettwovalue(recipe.healthLabels);
  const [isFavorite, setisFavorite] = useState(localStorage.getItem('favorites')?.includes(recipe.label));

  const addRecipetoFavorite = ()=>{
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const isAlredyfav = favorites.some((fav)=> fav.label === recipe.label);

    if(isAlredyfav){
      favorites = favorites.filter((fav)=> fav.label !== recipe.label);
      setisFavorite(false);
    }else{
      favorites.push(recipe);
      setisFavorite(true);
    }

    localStorage.setItem('favorites',JSON.stringify(favorites))
  }

  return (
    <div className={`flex flex-col rounded-md  ${bg} overflow-hidden p-3 relative`}>
            <a 
            href={`https://www.youtube.com/results?search_query=${recipe.label} recipe`} 
            target='_blank'
            className='relative h-32'>
              <img src={recipe.image} alt="" 
              className='w-full rounded-md h-full object-cover cursor-pointer'
              />
              <div className='absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center
              gap-1 text-sm'>
                <Soup size={"16"}/>{recipe.yield} servings
              </div>

              <div 
              className='absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer'
              onClick={(e)=>{
                  e.preventDefault();  //it prevent us from going to yt link
                  addRecipetoFavorite();
              }}
              >
                {!isFavorite && <Heart size={"20"} className='hover:fill-red-500 hover:text-red-500'/>}

                {isFavorite && <Heart size={"20"} className='fill-red-500 text-red-500'/>}
                
              </div>
            </a>

            <div className='flex mt-1'>
              <p className='font-bold tracking-wide'>{recipe.label}</p>
            </div>
            <p className='my-2 capitalize'>{recipe.cuisineType} Kitchen</p>

            <div className='flex gap-2 mt-auto'>
              {
                healthlabel.map((item,index)=>(
                  <div key={index} className={`flex gap-1 rounded-md items-center p-1 ${badge}`}>
                    <HeartPulse size={"16"}/>
                    <span className='text-sm tracking-tighter font-semibold'>{item}</span>
                  </div>
                ))
              }
            </div>
          </div>
  )
}

export default RecipeCard