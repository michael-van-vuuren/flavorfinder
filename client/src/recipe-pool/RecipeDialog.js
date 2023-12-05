import React, { useState, useEffect, useContext, useRef } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DOMPurify from 'dompurify'

const DisplayRecipe = ({selectedRecipe, modifyHTML, setSelectedRecipe, setRecipeCompleted, recipeCompleted}) => {
    
    const handleDialogClose = () => {
    setSelectedRecipe(null)
    setRecipeCompleted(false)
    }

    const handleCompletedRecipe = (id) => {
        setRecipeCompleted(true)
        
        console.log('completed')
        console.log(id)
    }

    return (
      <div>
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
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(modifyHTML(selectedRecipe.description)) }} />
            </div>
          </DialogContent>
        </Dialog>
      )}
      </div>
    )
  }

export default DisplayRecipe