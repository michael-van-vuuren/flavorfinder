import React from 'react';
import "./RecipePool.css";

const RecipePool = () => {

  const RecipeCard = () => {
    return (
      <div className='recipeCard'>
        Recipe
      </div>
    )
  }

  return (
    <div>
      <h2 id="recipepool-title">Potential Recipes</h2>
      <p>Based on ingredients in your pantry</p>
      <div className="recipeCardContainer">
        {RecipeCard()}
        {RecipeCard()}
        {RecipeCard()}
        {RecipeCard()}
        {RecipeCard()}
        {RecipeCard()}
      </div>
    </div>
  );
}

export default RecipePool;