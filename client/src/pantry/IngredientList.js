import React from 'react'
import pluralizeIngredient from '../utility/pluralizeIngredient.js'

function IngredientList({ mode, pantry, removeToggle, handleRowClick, handleTagClick, handleRemove }) {

  return (
    <div>
      {
        pantry.map((ingredient, index) => (
          <li key={index} className={mode ? '' : 'highlight'} onClick={() => handleRowClick(ingredient.name, ingredient.ingredientId)}>
            {ingredient.image && (
              <img
                className="ingredient-image"
                src={process.env.PUBLIC_URL + "/images/svg/" + ingredient.image}
                alt="Ingredient"
              />
            )}
            <div className="row">
              {mode ? (
                <span className="quantity-display">{ingredient.quantity}{ingredient.units} of</span>
              ) : (
                <span className="quantity-display hidden">{ingredient.quantity}{ingredient.units} of</span>
              )}
              <div className="col">
                {mode ? (
                  <span className="tag" onClick={(event) => handleTagClick(ingredient.name, ingredient.ingredientId, event)}>
                    {pluralizeIngredient(ingredient.name, ingredient.quantity)}
                  </span>
                ) : (
                  <span className="tag hidden">
                    {pluralizeIngredient(ingredient.name, ingredient.quantity)}
                  </span>
                )}
              </div>
              {removeToggle && (
              <button className="remove-button" onClick={() => handleRemove(ingredient.ingredientId)}>
                Remove
              </button>
            )}
            </div>
          </li>
        ))
      }
    </div>
  )
}

export default IngredientList
