import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
* @typedef {Object} Ingredient
* @property {string} name - Name
* @property {number} id - Id
* @property {number} quantity - Quantity
* @property {string} units - Units
* @property {string} image - Image
*/

/**
 * Controller class for Pantry management functionality.
 * @class IngredientController
 */
class IngredientController {
  static async fetchData(filePath) {
    try {
      const data = await readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('error reading or parsing data:', error);
      throw error;
    }
  }

  /**
   * Get ingredient objects.
   *
   * @static
   * @async
   * @function
   * @param {Ingredient[]} res - Responds with success or error.
   */
  static async serverGetIngredients(req, res, next) {
    try {
      const filePath = join(__dirname, '../resources/ingredients-with-images.json');
      const data = await IngredientCtrl.fetchData(filePath);
      res.json(data);
    } catch (error) {
      console.error('unexpected error:', error);
      res.status(500).json({ error: 'internal server error' });
    }
  }

  // probably not used 
  static async serverGetIngredient(req, res, next) {
    try {
      let id = req.params.id
      const filePath = join(__dirname, '../resources/ingredients-verbose.json');
      const data = await IngredientCtrl.fetchData(filePath);
      // find the ingredient with the specified id
      const ingredient = data.find(item => item.id === parseInt(id, 10));

      if (ingredient) {
        res.json(ingredient);
      } else {
        res.status(404).json({ error: 'Ingredient not found' });
      }
    } catch (error) {
      console.error('unexpected error:', error);
      res.status(500).json({ error: 'internal server error' });
    }
  }
}

export default IngredientController