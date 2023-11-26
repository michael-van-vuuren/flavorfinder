import express from 'express'
import PantryCtrl from './pantry.controller.js'
import IngredientCtrl from './ingredient.controller.js'
import GoogleLoginCtrl from './google-login.controller.js'

const router = express.Router()

// create new user (flavorfinder.pantries)
router.route('/users/new')
  .post(PantryCtrl.apiAddUser)
// check if user already exists (flavorfinder.pantries)
router.route('/users/exists/:sub')
  .get(PantryCtrl.apiUserExists)
// get user's name (flavorfinder.pantries)
router.route('/users/name/:id')
  .get(PantryCtrl.apiGetName)
// get, update, delete items from user's pantry (flavorfinder.pantries)
router.route('/users/:id')
  .get(PantryCtrl.apiGetPantry)
  .put(PantryCtrl.apiUpdatePantry)
  .delete(PantryCtrl.apiDeletePantryItem)
// google login api
router.route('/clientid')
  .get(GoogleLoginCtrl.apiGetClientId)

// get ingredients for dropdown; no image (server/resources/ingredients.json)
router.route('/ingredients-noimage')
  .get(IngredientCtrl.serverGetIngredientsNoImage)
// get ingredients for pantry; name and image (server/resources/ingredients.json)
router.route('/ingredients')
  .get(IngredientCtrl.serverGetIngredients)
// get single ingredient image (server/resources/ingredients.json)
router.route('/ingredients/images/:id')
  .get(IngredientCtrl.serverGetIngredientImage)

export default router