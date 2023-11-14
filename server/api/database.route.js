import express from 'express'
import PantryCtrl from './pantry.controller.js'
import IngredientCtrl from './ingredient.controller.js'

const router = express.Router()

// create new user (flavorfinder.pantries)
router.route('/users/new')
  .post(PantryCtrl.apiAddUser)
// get, update, delete items from user's pantry (flavorfinder.pantries)
router.route('/users/:id')
  .get(PantryCtrl.apiGetPantry)
  .put(PantryCtrl.apiUpdatePantry)
  .delete(PantryCtrl.apiDeletePantryItem)

// get ingredients for dropdown (flavorfinder.ingredients)
router.route('/ingredients')
  .get(IngredientCtrl.serverGetIngredientsNoImage)
// get ingredient image when it is added (flavorfinder.ingredients)
router.route('/ingredients/images/:id')
  .get(IngredientCtrl.serverGetIngredientImage)

export default router