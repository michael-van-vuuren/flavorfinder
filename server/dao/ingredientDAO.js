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
}