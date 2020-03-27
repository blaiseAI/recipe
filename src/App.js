import React from 'react';
import './App.css';
import Recipe from './Recipe'
import { useEffect } from 'react';
import { useState } from 'react';

const App = () => {
  const YOUR_APP_ID = "d7e621d6";
  const YOUR_APP_KEY = "2c2edeb3febc39ae400465f1369391f6";
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken')
  useEffect(()=>{
    getRecipes();
  },[query])

  const getRecipes = async ()=> {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits);
  }

  const searchHandler = (e)=>{
    e.preventDefault();
    setSearch(e.target.value);
  }
  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  return(
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input type="text" className="search-bar" onChange= {searchHandler} value={search}/>
        <button type="submit" className="search-button">Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe key={recipe.recipe.label}
        title= {recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
    </div>
  )
}

export default App;
