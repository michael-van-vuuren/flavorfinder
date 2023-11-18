
import { useState } from 'react'
import Pantry from './Pantry.js'
import AddToPantry from './AddToPantry.js'
import './style.css'

const PantryHome = ({ pantry, ingredients, fetchPantry }) => {
  const [toggleAdd, setToggleAdd] = useState(false)
  const [pantryAddition, setPantryAddition] = useState([])

  const handleAddIngredientBtn = () => {
    setToggleAdd(true)
  }

  const handleConfirmBtn = async (id) => {
    setToggleAdd(false)
    console.log('PANTRY', pantryAddition)
    setPantryAddition([])
    try {
      const url = `http://localhost:3001/api/v1/users/${id}`
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
      
      fetchPantry('6556d131755e12ed18838678')
    } catch (e) {
      console.error('Error updating pantry:', e.message)
    }
  }

  return (
    <div>
      {toggleAdd ? (
        <div>
          {/* michael - 6556b9a6b7de3c37de02c24b
            tom       - 6556d131755e12ed18838678 */}
          <button className='pantry-menu-btn' onClick={() => handleConfirmBtn('6556d131755e12ed18838678')}>Confirm</button>
          <AddToPantry pantryAddition={pantryAddition} setPantryAddition={setPantryAddition} ingredients={ingredients} />
        </div>
      ) : (
        <div>
          <button className='pantry-menu-btn' onClick={handleAddIngredientBtn}>Add Ingredients</button>
          <Pantry pantry={pantry} ingredients={ingredients} fetchPantry={fetchPantry} />
        </div>
      )}
    </div>
  )

}

export default PantryHome