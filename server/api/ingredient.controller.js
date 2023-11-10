import IngredientDAO from '../dao/ingredientDAO.js'

export default class IngredientController {
  // res = [{"_id":"..","name":".."},..]
  static async apiGetIngredientsNoImage(req, res, next) {
    try {
      let ingredients = await IngredientDAO.getIngredientsNoImage()
      res.json(ingredients || [])
    } catch (e) {
      console.log(`cannot get the ingredient labels, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  // res = "<imageurl>"
  static async apiGetIngredientImage(req, res, next) {
    try {
      const ingredientId = req.params.id

      let image = await IngredientDAO.getIngredientImage(ingredientId)
      res.json(image)
    } catch (e) {
      console.log(`cannot get the ingredient image, ${e}`)
      res.status(500).json({ error: e })
    }
  }
}