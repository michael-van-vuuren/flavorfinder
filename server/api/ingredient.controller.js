import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class IngredientCtrl {
    static filePath = join(__dirname, '../resources/ingredients.json');

    static async fetchData() {
        try {
            const data = await readFile(IngredientCtrl.filePath, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.error('error reading or parsing data:', error);
            throw error;
        }
    }

    static async serverGetIngredientsNoImage(req, res) {
        try {
            const data = await IngredientCtrl.fetchData();
            const result = data.map(({ _id, name }) => ({ _id, name }));
            res.json(result);
        } catch (error) {
            console.error('unexpected error:', error);
            res.status(500).json({ error: 'internal server error' });
        }
    }

    static async serverGetIngredientImage(req, res) {
        try {
            const id = req.params.id;
            const data = await IngredientCtrl.fetchData();
            const selectedIngredient = data.find((item) => item._id == id);

            if (selectedIngredient) {
                res.json(selectedIngredient.image);
            } else {
                res.status(404).json({ error: 'ingredient not found' });
            }
        } catch (error) {
            console.error('unexpected error:', error);
            res.status(500).json({ error: 'internal server error' });
        }
    }
}
