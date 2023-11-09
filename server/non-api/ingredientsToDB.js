import mongodb from "mongodb"
import 'dotenv/config'
import IngredientDAO from "../dao/ingredientDAO.js"

const MongoClient = mongodb.MongoClient
const mongo_username = process.env['MONGO_USERNAME']
const mongo_password = process.env['MONGO_PASSWORD']
const uri = `mongodb+srv://${mongo_username}:${mongo_password}@cluster0.i2ikqxx.mongodb.net/?retryWrites=true&w=majority`

MongoClient.connect(uri, {
  maxPoolSize: 50,
  wtimeoutMS: 2500,
})
  .catch(err => {
    console.error(err.stack)
    process.exit(1)
  })
  .then(async client => {
    await IngredientDAO.injectDB(client)
    // add new ingredients here
    const newIngredients = [
      { name: 'apple', image: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' },
      { name: 'banana', image: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' },
      { name: 'carrot', image: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png' }
    ]
    
    newIngredients.map(newIngredient => addNewIngredient(newIngredient.name, newIngredient.image))
  })

const addNewIngredient = async (name, image) => {
  try {
    const result = await IngredientDAO.addIngredient(name, image)
    result === null
      ? console.log(`${name} is already in the database.`)
      : console.log(`${name} added to the database:`, result)
  } catch (error) {
    console.error('error adding ingredient to the database:', error)
  }
}

