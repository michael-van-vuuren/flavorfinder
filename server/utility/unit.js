import convert from 'convert-units';

class UnitConverter {
    static convertToSI(ingredient) {
        const { name, id, quantity, units, image } = ingredient;

        if (units === 'g' || units === 'ml' || units === 'count') {
            return ingredient;
        }

        try {
            let convertedQuantity;

            // volume
            if (['l', 'cup', 'gal', 'fl-oz', 'qt', 'pnt', 'tsp', 'Tbs'].includes(units)) {
                convertedQuantity = parseInt(convert(quantity).from(units).to('ml'));
                return { name, id, quantity: convertedQuantity, units: 'ml', ...(image && { image }) };
            }
            // mass
            else if (['oz', 'lb', 'kg', 'mg'].includes(units)) {
                convertedQuantity = parseInt(convert(quantity).from(units).to('g'));
                return { name, id, quantity: convertedQuantity, units: 'g', ...(image && { image }) };
            } else {
                return ingredient;
            }
        } catch (error) {
            console.error(`Error converting unit: ${error.message}`);
            return ingredient;
        }
    }

    static convertPantryToSI(pantry) {
        return pantry.map((ingredient) => this.convertToSI(ingredient));
    }
}

export default UnitConverter;
