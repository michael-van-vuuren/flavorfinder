import React, { useState, useEffect, useContext, useRef } from 'react';
import Slider from '@mui/material-next/Slider';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { MainContext } from '../MainContext';
import "./RecipePool.css";

const RecipePool = () => {
  const [sliderValue, setSliderValue] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { userId } = useContext(MainContext);
  const [recipes, setRecipes] = useState([]);

  const [scrollToBottom, setScrollToBottom] = useState(false)
  const recipeCardContainerRef = useRef(null);

  // get personalized list of available recipes
  const fetchRecipes = async () => {
    const url = `http://localhost:3001/api/v1/recipe-pool/${userId}/${sliderValue}`
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    let responseData = await res.json()
    const recipes = responseData.recipes;
    console.log(recipes);
    setRecipes(recipes);
  }

  useEffect(() => {
    // Fetch recipes from database
    fetchRecipes();
  }, [sliderValue]);

  useEffect(() => {
    if (scrollToBottom && recipeCardContainerRef.current) {
      recipeCardContainerRef.current.scrollTop = recipeCardContainerRef.current.scrollHeight;
      setScrollToBottom(false)
    }
  }, [scrollToBottom, recipes])

  const handleRecipeCardClick = (recipe) => {
    setSelectedRecipe(recipe);
  }

  const handleDialogClose = () => {
    setSelectedRecipe(null);
  }

  const RecipeCard = ({ recipe }) => {
    const handleClick = () => {
      handleRecipeCardClick(recipe);
    }

    return (
      <div key={recipe.id} className='recipeCard' onClick={handleClick}>
        <p>{recipe.name}</p>
      </div>
    )
  }

  const handleChange = (e) => {
    setSliderValue(e.target.value)
  }

  return (
    <div>
      <h2 id="recipepool-title">Potential Recipes</h2>
      <p>Allowing {sliderValue} extra {sliderValue === 1 ? 'ingredient' : 'ingredients'}</p>
      <div className='sliderContainer'>
        <p>Tolerance</p>
        <Slider
          value={sliderValue}
          min={0}
          step={1}
          max={15}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
          style={{ width: "500%" }}
          marks={true}
        />
      </div>

      <div className="recipeCardContainer" ref={recipeCardContainerRef}>
        {recipes.map(recipe => (<RecipeCard key={recipe.id} recipe={recipe} />))}
      </div>

      {selectedRecipe !== null && (
        <Dialog open={selectedRecipe !== null} onClose={handleDialogClose}>
          <DialogContent>
            <div className='dialogContainer'>
              <h2>{selectedRecipe.name}</h2>
              <br></br>
              <p><b>Description</b></p>

              <br></br>

              <p>{selectedRecipe.name}</p>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default RecipePool;