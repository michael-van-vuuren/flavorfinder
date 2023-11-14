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
      { name: "apple", image: "https://openmoji.org/data/color/svg/1F34E.svg" },
      { name: "banana", image: "https://openmoji.org/data/color/svg/1F34C.svg" },
      { name: "carrot", image: "https://openmoji.org/data/color/svg/1F955.svg" },
      { name: "onion", image: "https://openmoji.org/data/color/svg/1F9C5.svg" },
      { name: "milk", image: "https://openmoji.org/data/color/svg/E153.svg" },
      { name: "chicken wing", image: "https://openmoji.org/data/color/svg/1F357.svg" },
      { name: "pear", image: "https://openmoji.org/data/color/svg/1F350.svg" },
      { name: "coconut", image: "https://openmoji.org/data/color/svg/1F965.svg" },
      { name: "watermelon", image: "https://openmoji.org/data/color/svg/1F349.svg" },
      { name: "lemon", image: "https://openmoji.org/data/color/svg/1F34B.svg" },
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

