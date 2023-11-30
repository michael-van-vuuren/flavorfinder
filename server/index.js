import app from './server.js'
import 'dotenv/config'
import mongodb from 'mongodb'
import PantryDAO from './dao/pantryDAO.js'
import GoogleLoginDAO from './dao/google-loginDAO.js'

const MongoClient = mongodb.MongoClient
const mongo_username = process.env['MONGO_USERNAME']
const mongo_password = process.env['MONGO_PASSWORD']
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.i2ikqxx.mongodb.net/?retryWrites=true&w=majority`

const port = 3001

MongoClient.connect(
  uri,
  {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
  })
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await PantryDAO.injectDB(client)
    await GoogleLoginDAO.injectDB(client)
    app.listen(port, () => {
      console.log(`listening on port ${port}`)
    })
  })