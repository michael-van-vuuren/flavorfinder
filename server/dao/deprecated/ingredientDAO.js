import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectId

let ingredientdb

export default class IngredientDAO {
  static async injectDB(conn) {
    if (ingredientdb) {
      return
    }
    try {
      ingredientdb = await conn.db('flavorfinder').collection('ingredients')
      ingredientdb.createIndex( { 'name': 1 }, { unique: true } )
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addIngredient(name, image) {
    try {
      return await ingredientdb.insertOne(
        { name, image }
      )
      
    } catch (e) {
      if (e.code === 11000) return null // already in ingredientdb
  
      console.error(`Unable to post new ingredient: ${e}`)
      return { error: e }
    }
  }

  static async getIngredientsNoImage() {
    try {
      const projection = { _id: 1, name: 1 }

      return await ingredientdb.find(
        {}, { projection }
      ).toArray()  
    } catch (e) {
      console.error(`Unable to get ingredients: ${e}`)
      return { error: e }
    }
  }

  static async getIngredientImage(ingredientId) {
    try {
      const query = { _id: new ObjectId(ingredientId) }
      const projection = { _id: 0, image: 1 }

      const result = await ingredientdb.find(
        query, { projection }
      ).toArray()
      return result[0] ? result[0].image : ''
    } catch (e) {
      console.error(`Unable to get ingredients: ${e}`)
      return { error: e }
    }
  }
}