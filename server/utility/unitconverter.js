import convert from 'convert-units'

class UnitConverter {
  static convertToSI(ingredient) {
    const { ingredientId, quantity, units } = ingredient

    if (units === 'g' || units === 'ml')
      return ingredient

    try {
      let convertedQuantity

      // volume
      if (['l', 'cup', 'gal', 'fl-oz', 'qt', 'pnt', 'tsp', 'Tbs'].includes(units)) {
        convertedQuantity = convert(quantity).from(units).to('ml') 
        return { ingredientId: ingredientId, quantity: convertedQuantity, units: 'ml' }
      }
      // mass
      else if (['oz', 'lb', 'kg', 'mg'].includes(units)) {
        convertedQuantity = convert(quantity).from(units).to('g') 
        return { ingredientId: ingredientId, quantity: convertedQuantity, units: 'g' }
      }
    } catch (error) {
      console.error(`error converting unit: ${error.message}`)
      return ingredient
    }
  }

  static convertPantryToSI(pantry) {
    return pantry.map((ingredient) => this.convertToSI(ingredient))
  }
}

export default UnitConverter
