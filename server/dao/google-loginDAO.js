import mongodb from 'mongodb'
const ObjectId = mongodb.ObjectId

let googlelogindb

export default class GoogleLoginDAO {
  static async injectDB(conn) {
    if (googlelogindb) {
      return
    }
    try {
        googlelogindb = await conn.db('flavorfinder').collection('google-login-api')
    } catch (e) {
      console.error(`Unable to establish collection handles in userDAO: ${e}`)
    }
  }

  static async getClientId() {
    try {
      return await googlelogindb.findOne(
        { _id: new ObjectId('655d595d868e371db86da999') }
      )
    } catch (e) {
      console.error(`Unable to get Google client id: ${e}`)
      return { error: e }
    }
  }

}