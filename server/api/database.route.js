import express from 'express'
import PantryCtrl from './pantry.controller.js'
import IngredientCtrl from './ingredient.controller.js'
import GoogleLoginCtrl from './google-login.controller.js'
import LLMCtrl from './llm.controller.js'
import RecipeCtrl from './recipe.controller.js'

const router = express.Router()

// create new user (flavorfinder.pantries)
router.route('/users/new')
  .post(PantryCtrl.apiAddUser)
// check if user already exists (flavorfinder.pantries)
router.route('/users/exists/:sub')
  .get(PantryCtrl.apiUserExists)
// get, update, delete items from user's pantry (flavorfinder.pantries)
router.route('/users/:id')
  .get(PantryCtrl.apiGetPantry)
  .put(PantryCtrl.apiUpdatePantry)
  .delete(PantryCtrl.apiDeletePantryItem)
// google login api
router.route('/clientid')
  .get(GoogleLoginCtrl.apiGetClientId)

// get ingredients for pantry; name and image (server/resources/ingredients.json)
router.route('/ingredients')
  .get(IngredientCtrl.serverGetIngredients)
// get expanded-form ingredient
router.route('/ingredient/:id')
  .get(IngredientCtrl.serverGetIngredient)

// chatbot<->llm endpoint
router.route('/chatbot')
  .post(LLMCtrl.serverSendMessage)

// recipe pool
router.route('/recipe-pool/:id/:threshold')
  .get(RecipeCtrl.serverGetRecipePool)

export default router