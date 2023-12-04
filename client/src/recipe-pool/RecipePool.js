import React, { useState, useEffect, useContext, useRef } from 'react';
import Slider from '@mui/material-next/Slider';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { MainContext } from '../MainContext';
import "./RecipePool.css";

const RecipePool = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const { sliderValue, setSliderValue } = useContext(MainContext);
  const [scrollToBottom, setScrollToBottom] = useState(false)
  const recipeCardContainerRef = useRef(null);

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
          <div className="recipe-name">{recipe.name}</div>
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
      <div className="outerRecipeBox">
        <div className="recipeCardContainer" ref={recipeCardContainerRef}>
          {recipes.map(recipe => (<RecipeCard key={recipe.id} recipe={recipe} />))}
        </div>
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