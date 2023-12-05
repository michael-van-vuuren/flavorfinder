import React, { useState, useEffect, useContext, useRef } from 'react'
import Slider from '@mui/material-next/Slider'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { MainContext } from '../MainContext'
import "./RecipePool.css"
import DOMPurify from 'dompurify'
import DisplayRecipe from './RecipeDialog'
import HTMLModifier from "./HTMLModifier.js"

const RecipePool = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const { sliderValue, setSliderValue } = useContext(MainContext)
  const [scrollToBottom, setScrollToBottom] = useState(false)
  const [recipeCompleted, setRecipeCompleted] = useState(false)
  const recipeCardContainerRef = useRef(null)

  useEffect(() => {
    if (scrollToBottom && recipeCardContainerRef.current) {
      recipeCardContainerRef.current.scrollTop = recipeCardContainerRef.current.scrollHeight
      setScrollToBottom(false)
    }
  }, [scrollToBottom, recipes])

  const handleRecipeCardClick = (recipe) => {
    setSelectedRecipe(recipe)
  }

  const RecipeCard = ({ recipe }) => {
    const handleClick = () => {
      handleRecipeCardClick(recipe)
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

  const handleDialogClose = () => {
    setSelectedRecipe(null)
    setRecipeCompleted(false)
  }


  return (
    <div>
      <h2 id="recipepool-title">Potential Recipes</h2>
      <div className='sliderContainer'>
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
      <p>With less than <span style={{ color: '#a9d97f', fontSize: '20pt' }}><strong>{sliderValue}</strong></span> additional {sliderValue === 1 ? 'ingredient' : 'ingredients'}, you can make</p>
      <div className="outerRecipeBox">
        <div className="recipeCardContainer" ref={recipeCardContainerRef}>
          {recipes.map(recipe => (<RecipeCard key={recipe.id} recipe={recipe} />))}
        </div>
      </div>
      {selectedRecipe !== null && (
        <DisplayRecipe recipeCompleted={recipeCompleted} selectedRecipe={selectedRecipe} handleDialogClose={handleDialogClose} modifyHTML={modifyHTML} setSelectedRecipe={setSelectedRecipe} setRecipeCompleted={setRecipeCompleted}></DisplayRecipe>
      )}
    </div>
  )
}

export default RecipePool