import PantryDAO from '../dao/pantryDAO.js'
import UnitConverter from '../utility/unitconverter.js'

export default class PantryController {
  static async apiAddUser(req, res, next) {
    try {
      const user = req.body.user
      const pantry = req.body.pantry
      const pantrySI = UnitConverter.convertPantryToSI(pantry)

      const userHandle = await PantryDAO.addUser(
        user,
        pantrySI
      )
      res.json({ status: 'success' })
    } catch (e) {
      res.status(500).join({ error: e.message })
    }
  }

  static async apiGetPantry(req, res, next) {
    try {
      let id = req.params.id || {}
      
      let userData = await PantryDAO.getUserData(id)
      if (!userData) {
        res.status(404).json({ error: 'cannot find user' })
        return
      }
      res.json(userData.pantry || [])
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiUpdatePantry(req, res, next) {
    try {
      const userId = req.params.id
      const newPantry = req.body.pantry

      const existingUserData = await PantryDAO.getUserData(userId)
      if (!existingUserData) {
        res.status(400).json({ error: 'cannot find user' })
        return
      }

      const newPantrySI = UnitConverter.convertPantryToSI(newPantry)
      const combinedPantry = PantryController.combinePantries(existingUserData.pantry, newPantrySI)

      const result = await PantryDAO.updateUserPantry(userId, combinedPantry)
      if (result.error) {
        res.status(500).json({ error: result.error })
        return
      }
      res.json({ status: 'success' })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static combinePantries(existingPantry, newPantry) {
    const combinedPantry = [...existingPantry] // copy current pantry

    for (const newItem of newPantry) {
      const existingItemIndex = combinedPantry.findIndex(item => item.ingredientId === newItem.ingredientId)

      if (existingItemIndex !== -1) {
        // ingredient already in pantry, increment the quantity
        combinedPantry[existingItemIndex].quantity += newItem.quantity
      } else {
        // new ingredient, add new entry to the pantry
        combinedPantry.push(newItem)
      }
    }

    return combinedPantry
  }

  static async apiDeletePantryItem(req, res, next) {
    try {
      const userId = req.params.id
      const ingredientIdToDelete = req.body.deleteme

      if (!userId || !ingredientIdToDelete) {
        res.status(400).json({ error: 'userId and ingredientId are required.' })
        return
      }

      const result = await PantryDAO.deletePantryItem(userId, ingredientIdToDelete)
      if (result.modifiedCount === 0) {
        res.status(400).json({ error: 'user does not have that item' })
        return
      }
      if (result.error) {
        res.status(500).json({ error: result.error })
        return
      }
      res.json({ status: 'success' })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

}
  

