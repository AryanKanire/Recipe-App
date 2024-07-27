import { Heart, HeartPulse, Search, Soup } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import RecipeCard from './RecipeCard'
import { getRandomColor } from '../lib/utiles';

const API_ID=import.meta.env.VITE_API_KEY ;
const API_KEY=import.meta.env.VITE_API_ID;

// import.meta.env.VITE_API_ID
// import.meta.env.VITE_API_KEY

function HomePage() {

  const [recipes, setrecipes] = useState([]);
  const [loading, setloading] = useState(true);

  const fetchRecipe = async(searchQuery)=>{
    setloading(true);
    setrecipes([]);
    try {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2/?app_id=${API_ID}&app_key=${API_KEY}&q=${searchQuery}&type=public`)
      const data = await response.json();
      console.log(data)
      setrecipes(data.hits)
    } catch (error) {
      console.log(error.message);
    }finally{
      setloading(false);
    }
  } 

  useEffect(() => {
    fetchRecipe("chiken");
  }, [])
  
  const handelsearch =(e)=>{
    e.preventDefault();
    fetchRecipe(e.target[0].value)
  }

  return (
    <div className='bg-[#faf9fb] flex-1 p-10'>
      <div className='max-w-screen-lg mx-auto'>
        <form onSubmit={handelsearch}>
          <label className='input shadow-md flex items-center gap-2'>
                <Search size={"24"}/>
                <input type="text"
                 className='text-sm md:text-md grow'
                 placeholder='What do you want to cook'/>
          </label>
        </form>
        <h1 className='font-bold text-3xl md:text-5xl mt-4'>
          Recomened Recipes
        </h1>
        <p className='text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight'>
          Popular Choices
        </p>

        <div className='grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

        {!loading && recipes.map(({recipe},index)=>(
          <RecipeCard key={index} recipe={recipe} {...getRandomColor()}
          />))}

        {loading && 
          [...Array(9)].map((_,index)=>(
            <div key={index} className="flex flex-col gap-4 w-full">
              <div className="flex gap-4 items-center">
                <div className="skeleton w-16 h-16 rounded-full shrink-0"></div>
                <div className="flex flex-col gap-4">
                  <div className="skeleton h-4 w-20"></div>
                  <div className="skeleton h-4 w-28"></div>
                </div>
              </div>
              <div className="skeleton h-32 w-full"></div>
            </div>
          ))

        }
      
        </div>
      </div>
    </div>
  )
}

export default HomePage