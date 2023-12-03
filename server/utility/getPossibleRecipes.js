export default function getPossibleRecipes(threshold, recipes, pantry) {
    const matchedRecipes = [] // store all matched recipes
    const pantryIngredients = pantry.ingredients
    // sort pantry ingredients by ingredient id ascending
    pantryIngredients.sort((a, b) => a.ingredientId - b.ingredientId)

    // loop over all recipes to find matches
    for (const recipe of recipes) {
        const totalIngredients = recipe.ingredients.length
        let matching = 0;

        let index1 = 0;
        let index2 = 0;

        while (index1 < pantryIngredients.length && index2 < recipe.ingredients.length) {
            if (pantryIngredients[index1].id === recipe.ingredients[index2].ingredientId) {
                if (pantryIngredients[index1].quantity >= recipe.ingredients[index2].quantity) {
                    matching++
                }
                index1++;
                index2++;
            }

            else if (pantryIngredients[index1].id > recipe.ingredients[index2].ingredientId) {
                index2++;
            }

            else {
                index1++;
            }
        }

        if (matching / totalIngredients >= threshold) matchedRecipes.push(recipe)
    }

    return matchedRecipes
}