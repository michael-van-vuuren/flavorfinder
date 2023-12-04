import UnitConverter from "./unitconverter2.js"

class RecipeCalculator {
    static findPartialMatch(p_list, r_list, k) {
        const p_len = p_list.length
        const r_len = r_list.length
        const k_store = k
        let i = 0
        let j = 0

        while (i < p_len && j < r_len) {
            let p = p_list[i]
            let r = r_list[j]
            let p_id = p.ingredientId
            let r_id = r.id
            
            if (p_id === r_id && p.quantity >= r.quantity && p.units === r.units) {
                i++
                j++
            }
            else if (p_id > r_id) {
                i++
            }
            else if (p_id < r_id) {
                j++
                k--
            } 
            else {
                i++
                k--
            }

            if (k < 0) { return false }
        }
        if (r_len - j > k) { return false }
        if (r_len <= k_store) { return false }
        return true
    }

    static calculateRecipePool(pantry, recipes, threshold) {
        const recipe_pool = []
        const pantry_ingredients = [...pantry]
        pantry_ingredients.sort((a,b) => b.ingredientId - a.ingredientId)

        for (const recipe of recipes) {
            const recipe_ingredients = UnitConverter.convertPantryToSI(recipe.ingredients)
            for (let k = threshold; k >= 0; k--) {
                const matching = this.findPartialMatch(pantry_ingredients, recipe_ingredients, k)
                if (matching) { 
                    if (!recipe_pool.some(item => item.id === recipe.id)) {
                        console.log('MATCH FOUND:', recipe)
                        recipe_pool.push(recipe) 
                    }
                }
            }
        }

        return recipe_pool
    }
}

export default RecipeCalculator

