import fs from 'fs'

function loadData(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath))
    } catch (error) {
        console.error('Error loading data:', error)
        return []
    }
}

function saveData(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
    } catch (error) {
        console.error('Error saving data:', error)
    }
}

function findNextId(existingData) {
    return existingData.length > 0 ? Math.max(...existingData.map(item => item._id)) + 1 : 1
}

function createNewObject(filePath, newIngredient) {
    try {
        const existingData = loadData(filePath)

        if (existingData.some(ingredient => ingredient.name === newIngredient.name)) {
            console.log(`An object with the name "${newIngredient.name}" already exists.`)
            return null
        }

        const nextId = findNextId(existingData)
        const newData = { _id: nextId, ...newIngredient }

        existingData.push(newData)
        saveData(filePath, existingData)

        return newData
    } catch (error) {
        console.error('Error creating new object:', error)
        return null
    }
}

function updateObject(filePath, updatedIngredient) {
    try {
        const existingData = loadData(filePath)

        const index = existingData.findIndex(item => item._id === updatedIngredient._id)

        if (index === -1) {
            console.log(`Object with ID ${updatedIngredient._id} not found.`)
            return null
        }

        existingData[index] = updatedIngredient
        saveData(filePath, existingData)

        return updatedIngredient
    } catch (error) {
        console.error('Error updating object:', error)
        return null
    }
}

function deleteObject(filePath, objectId) {
    try {
        const existingData = loadData(filePath)

        const index = existingData.findIndex(item => item._id === objectId)

        if (index === -1) {
            console.log(`Object with ID ${objectId} not found.`)
            return null
        }

        const deletedObject = existingData.splice(index, 1)[0]
        saveData(filePath, existingData)

        return deletedObject
    } catch (error) {
        console.error('Error deleting object:', error)
        return null
    }
}

function createObjectsFromArray(filePath, arrayOfObjects) {
    try {
        return arrayOfObjects.map((newIngredient) => {
            const createdObject = createNewObject(filePath, newIngredient)
            return createdObject ? createdObject : null
        }).filter(Boolean)
    } catch (error) {
        console.error('Error creating objects from array:', error)
        return []
    }
}

// create multiple
const filePath = '../resources/ingredients.json'
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
    { name: "strawberry", image: "https://openmoji.org/data/color/svg/1F353.svg" },
    { name: "blueberry", image: "https://openmoji.org/data/color/svg/1FAD0.svg" },
    { name: "raspberry", image: "https://openmoji.org/data/color/svg/E1C9.svg" },
  ]

const createdObjects = createObjectsFromArray(filePath, newIngredients)

if (createdObjects.length > 0) {
    console.log('Objects created:', createdObjects)
}

// create
// const newIngredient = { name: 'New Ingredient', imgpath: '../images/new.jpg' }
// const createdObject = createNewObject(filePath, newIngredient)

// update
// const updatedIngredient = { id: 1, name: 'Updated Ingredient', imgpath: '../images/updated.jpg' }
// const updatedObject = updateObject(filePath, updatedIngredient)

// delete
// const deleted = 1
// const deletedObject = deleteObject(filePath, deleted)
