import fs from 'fs'

const rawData1 = fs.readFileSync('../ingredients.json')
const rawData2 = fs.readFileSync('./ingredient-image-paths.json')

const data1 = JSON.parse(rawData1)
const data2 = JSON.parse(rawData2)

function findImage(foodGroup, foodSubgroup) {
  if (foodSubgroup && data2[foodGroup] && data2[foodGroup][foodSubgroup] && data2[foodGroup][foodSubgroup].image !== "") {
    return data2[foodGroup][foodSubgroup].image
  } else if (data2[foodGroup] && data2[foodGroup].image !== "") {
    return data2[foodGroup].image
  } else {
    return data2.image
  }
}

const updatedData1 = data1.map(obj => {
  const { food_group, food_subgroup, image } = obj
  const newImage = image === "" ? findImage(food_group, food_subgroup) : image

  return {
    ...obj,
    image: newImage,
  }
})

const updatedData1Json = JSON.stringify(updatedData1, null, 2)
fs.writeFileSync('../ingredients-with-images.json', updatedData1Json)

console.log('success')
