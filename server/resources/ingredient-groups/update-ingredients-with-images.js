import fs from 'fs'

const rawData1 = fs.readFileSync('../ingredients.json')
const rawData2 = fs.readFileSync('./image-lut.json')

const data1 = JSON.parse(rawData1)
const data2 = JSON.parse(rawData2)

function findImage(foodGroup) {
  if (data2[foodGroup] && data2[foodGroup].image !== "") {
    return data2[foodGroup].image
  } else {
    return data2.image
  }
}

const updatedData1 = data1.map(obj => {
  const { food_group, image } = obj
  const newImage = image === "" ? findImage(food_group) : image

  return {
    ...obj,
    image: newImage,
  }
})

const updatedData1Json = JSON.stringify(updatedData1, null, 2)
fs.writeFileSync('../ingredients-with-images.json', updatedData1Json)

console.log('success')
