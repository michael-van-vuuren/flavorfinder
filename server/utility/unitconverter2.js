import convert from 'convert-units'

class UnitConverter {
  static convertToSI(ingredient) {
    const { name, id, quantity, units } = ingredient

    if (units === 'g' || units === 'ml' || units === 'count')
      return ingredient

    try {
      let convertedQuantity

      // volume
      if (['l', 'cup', 'gal', 'fl-oz', 'qt', 'pnt', 'tsp', 'Tbs'].includes(units)) {
        convertedQuantity = parseInt(convert(quantity).from(units).to('ml'))
        return { name: name, id: id, quantity: convertedQuantity, units: 'ml' }
      }
      // mass
      else if (['oz', 'lb', 'kg', 'mg'].includes(units)) {
        convertedQuantity = parseInt(convert(quantity).from(units).to('g'))
        return { name: name, id: id, quantity: convertedQuantity, units: 'g' }
      }
      else {
        return ingredient 
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
