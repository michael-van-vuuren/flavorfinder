import React, { useState } from 'react';
import Slider from '@mui/material-next/Slider';
import "./RecipePool.css";

const RecipePool = () => {
  const [sliderValue, setSliderValue] = useState(0)

  const RecipeCard = (id) => {
    const handleRecipeCardClick = () => {

    }
    return (
      <div key={id} className='recipeCard' onClick={handleRecipeCardClick}>
        Recipe
      </div>
    )
  }

  const handleChange = (e) => {
    setSliderValue(e.target.value)
  }

  return (
    <div>
      <h2 id="recipepool-title">Potential Recipes</h2>
      <p>Based on ingredients in your pantry</p>
      <div className='sliderContainer'>
        <p>Tolerance</p>
        <Slider
          value={sliderValue}
          min={0}
          step={.05}
          max={1}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="non-linear-slider"
          style={{ width: "500%" }}
        />
      </div>

      <div className="recipeCardContainer">
        {RecipeCard(1)}
        {RecipeCard(2)}
        {RecipeCard(3)}
        {RecipeCard(4)}
        {RecipeCard(5)}
        {RecipeCard(6)}
      </div>
    </div>
  );
}

export default RecipePool;