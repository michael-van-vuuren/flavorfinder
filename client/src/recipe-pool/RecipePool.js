import React, { useState, useEffect, useContext, useRef } from 'react'
import Slider from '@mui/material-next/Slider'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import { MainContext } from '../MainContext'
import "./RecipePool.css"
import DOMPurify from 'dompurify'

const RecipePool = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null)
  const { sliderValue, setSliderValue } = useContext(MainContext)
  const [scrollToBottom, setScrollToBottom] = useState(false)
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

  const handleDialogClose = () => {
    setSelectedRecipe(null)
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

  const modifyHTML = (htmlString) => {
    // working div
    const tempDiv = document.createElement('div')
    tempDiv.innerHTML = htmlString

    // remove class='printfooter'
    const printFooterElements = tempDiv.getElementsByClassName('printfooter')
    Array.from(printFooterElements).forEach((element) => {
      element.innerHTML = '<br /><br />'
    })

    // remove class='mw-editsection'
    const editSectionElements = tempDiv.getElementsByClassName('mw-editsection')
    Array.from(editSectionElements).forEach((element) => {
      element.parentNode.removeChild(element)
    })

    // remove the first <p> under class='mw-body-content'
    const mwBodyContentElement = tempDiv.querySelector('.mw-body-content')
    if (mwBodyContentElement) {
      const firstParagraph = mwBodyContentElement.querySelector('p')
      if (firstParagraph) {
        firstParagraph.parentNode.removeChild(firstParagraph)
      }
    }

    // remove links
    const linkElements = tempDiv.getElementsByTagName('a')
    Array.from(linkElements).forEach((link) => {
      const hasImages = link.querySelector('img')
      if (!hasImages) {
        const textNode = document.createTextNode(link.textContent)
        link.parentNode.replaceChild(textNode, link)
      } else {
        link.style.pointerEvents = 'none' // no click on img
      }
    })

    // class='infobox'
    const infoboxElements = tempDiv.getElementsByClassName('infobox')
    Array.from(infoboxElements).forEach((infobox) => {
      infobox.style.borderRadius = '10px'
      infobox.style.overflow = 'hidden'
      infobox.style.border = '1px solid #ccc' 
      infobox.style.marginBottom = '20px'
      infobox.style.width = '100%'

      // infobox title
      const firstTh = infobox.querySelector('th')
      if (firstTh) {
        firstTh.style.backgroundColor = '#a9d97f'
        firstTh.style.borderRadius = '5px'
        firstTh.style.padding = '10px'
        firstTh.style.color = 'white' 
      }
    })

    // add margin-top to <h2> and <h3> elements under class='mw-body-content'
    const mwBodyContentHeadings = tempDiv.querySelectorAll('.mw-body-content h2, .mw-body-content h3')
    Array.from(mwBodyContentHeadings).forEach((heading) => {
      heading.style.marginTop = '10px' // Adjust as needed
    })

    return tempDiv.innerHTML
  }

  return (
    <div>
      <h2 id="recipepool-title">Potential Recipes</h2>
      <p>With {sliderValue} extra {sliderValue === 1 ? 'ingredient' : 'ingredients'}, you can make</p>
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
              <br />
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(modifyHTML(selectedRecipe.description)) }} />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default RecipePool