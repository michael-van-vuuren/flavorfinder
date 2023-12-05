import React, { useState, useEffect, useContext, useRef } from 'react'
import Slider from '@mui/material-next/Slider'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { MainContext } from '../MainContext'
import "./RecipePool.css"
import DOMPurify from 'dompurify'
import HTMLModifier from './HTMLModifier.js'

const RecipePool = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const { sliderValue, setSliderValue } = useContext(MainContext)
  const [scrollToBottom, setScrollToBottom] = useState(false)
  const recipeCardContainerRef = useRef(null)
  const [recipeCompleted, setRecipeCompleted] = useState(false)

  useEffect(() => {
    if (scrollToBottom && recipeCardContainerRef.current) {
      recipeCardContainerRef.current.scrollTop = recipeCardContainerRef.current.scrollHeight
      setScrollToBottom(false)
    }
  }, [scrollToBottom, recipes])

  const handleRecipeCardClick = (recipe) => {
    setSelectedRecipe(recipe)
  }

  const handleDialogClose = () => {
    setSelectedRecipe(null)
    setRecipeCompleted(false)
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

  const handleCompletedRecipe = (id) => {
    setRecipeCompleted(true)
    
    console.log('completed')
    console.log(id)
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
        <Dialog open={selectedRecipe !== null} onClose={handleDialogClose}>
          <DialogContent>
            <div className='dialogContainer'>
              <div className='dialogTitle'>
                <h2>{selectedRecipe.name}</h2>
                {recipeCompleted ? (
                  <p>Pantry updated!</p>
                ) : (
                  <button className="completeRecipeButton" onClick={() => handleCompletedRecipe(selectedRecipe.id)}>Complete</button>
                )}
              </div>
              <br />
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(HTMLModifier.modifyHTML(selectedRecipe.description)) }} />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default RecipePool