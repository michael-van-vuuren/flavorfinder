import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectId

let pantrydb

export default class PantryDAO {
  static async injectDB(conn) {
    if (pantrydb) {
      return
    }
    try {
      pantrydb = await conn.db('flavorfinder').collection('pantries')
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async addUser(user, pantry) {
    try {
      const newUser = {
        user: user,
        pantry: pantry
      }
      return await pantrydb.insertOne(newUser)
      
    } catch (e) {
      console.error(`Unable to post new user: ${e}`)
      return { error: e }
    }
  }

  static async getUserData(userId) {
    try {
      return await pantrydb.findOne(
        { _id: new ObjectId(userId) }
      )
      
    } catch (e) {
      console.error(`Unable to get user: ${e}`)
      return null
    }
  }

  static async updateUserPantry(userId, newPantry) {
    try {
      const result = await pantrydb.updateOne(
         { _id: new ObjectId(userId) },
         { $set: { pantry: newPantry } }
      )
      return result
      
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }

  static async deletePantryItem(userId, ingredientIdToDelete) {
    try {
      const result = await pantrydb.updateOne(
        { _id: new ObjectId(userId) },
        { $pull: { pantry: { ingredientId: ingredientIdToDelete } } }
      )
      return result

    } catch (error) {
      console.error(`Error deleting pantry item in DAO: ${error.message}`)
      throw error
    }
  }
  
}