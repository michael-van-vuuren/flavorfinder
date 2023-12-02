import React, { useState, useEffect, useContext } from 'react';
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

  const fetchRecipes = async () => {} // get personalized list of available recipes

  useEffect(() => {
    // Fetch recipes from database
    fetchRecipes();
  }, []);

  const handleRecipeCardClick = (recipeId) => {
    setSelectedRecipe(recipeId);
  }

  const handleDialogClose = () => {
    setSelectedRecipe(null);
  }

  const RecipeCard = (id) => {
    const handleClick = () => {
      handleRecipeCardClick(id);
    }

    return (
      <div key={id} className='recipeCard' onClick={handleClick}>
        Recipe {id}
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

      <Dialog open={selectedRecipe !== null} onClose={handleDialogClose}>
        <DialogContent>
          <p>{selectedRecipe}</p>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default RecipePool;