import { useState } from 'react'
import Pantry from './Pantry.js'
import AddToPantry from './AddToPantry.js'
import './Pantry.css'

const PantryHome = ({ pantry, ingredients, fetchPantry, userId }) => {
  const [toggleAdd, setToggleAdd] = useState(false)
  const [pantryAddition, setPantryAddition] = useState([])

  const handleAddIngredientBtn = () => {
    setToggleAdd(true)
  }

  const handleCancelBtn = () => {
    setToggleAdd(false)
    setPantryAddition([])
  }

  const handleConfirmBtn = async () => {
    setToggleAdd(false)
    console.log('PANTRY ADDITION', pantryAddition)
    setPantryAddition([])
    try {
      const url = `http://localhost:3001/api/v1/users/${userId}`
      const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pantry: pantryAddition }),
      })

      if (!response.ok) {
        throw new Error(`Failed to update pantry: ${response.statusText}`)
      }
      const result = await response.json()
      console.log(result)
      
      fetchPantry(userId)
    } catch (e) {
      console.error('Error updating pantry:', e.message)
    }
  }

  return (
    <div>
      {toggleAdd ? (
        <div>
          <button className='cancel-button' onClick={() => handleCancelBtn()}>Cancel</button>
          <button className='pantry-menu-btn' onClick={() => handleConfirmBtn()}>Confirm</button>
          <AddToPantry pantryAddition={pantryAddition} setPantryAddition={setPantryAddition} ingredients={ingredients} />
        </div>
      ) : (
        <div>
          <button className='pantry-menu-btn' onClick={handleAddIngredientBtn}>Add Ingredients</button>
          <Pantry pantry={pantry} fetchPantry={fetchPantry} userId={userId} />
        </div>
      )}
    </div>
  )

}

export default PantryHome