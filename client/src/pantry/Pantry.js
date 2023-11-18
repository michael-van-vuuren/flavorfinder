import React, { useState, useEffect, useRef } from 'react'
import "./Pantry.css"
import pluralizeIngredient from '../utility/pluralizeIngredient.js'

const Pantry = ({ pantryContents, setAddingIngredients }) => {
    const [scrollToBottom, setScrollToBottom] = useState(false)
    const ingredientListRef = useRef(null)

    useEffect(() => {
        if (scrollToBottom && ingredientListRef.current) {
            ingredientListRef.current.scrollTop = ingredientListRef.current.scrollHeight
            setScrollToBottom(false)
        }
    }, [scrollToBottom])

    const handleButtonClick = () => {
        setAddingIngredients(true);
    }

    const getIngredientNameById = (id) => {
        const ingredient = pantryContents.find(item => item.ingredientId === id)
        return ingredient ? ingredient.name : ''
    }

    const handleRemove = (index) => {
        console.log("remove: todo")
    }

    return (
        <div>
            <div>
                {/* Display pantry contents */}
                {pantryContents.length > 0 && (
                    <div className='ingredient-list' ref={ingredientListRef}>
                        <ul>
                            {pantryContents.map((ingredient, index) => {
                                // console.log(ingredient); // Log the ingredient to the console
                                console.log(ingredient.ingredientId)
                                return (
                                    <li key={index} className='highlight'>
                                        {ingredient.quantity} {ingredient.units} of {getIngredientNameById(ingredient.ingredientId)}
                                        {ingredient.image && (
                                            <img src={ingredient.image} alt="Ingredient" className="ingredient-image" />
                                        )}
                                        <button className="remove-button" onClick={() => handleRemove(index)}>Remove</button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
            <div>
                <button onClick={handleButtonClick}>Add Ingredients</button>
            </div>
        </div>
    )
}

export default Pantry