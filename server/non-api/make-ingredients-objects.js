import fs from 'fs';

const rawData = fs.readFileSync('../resources/ingredients-verbose.json');
const originalData = JSON.parse(rawData);

const filteredData = originalData.map(obj => ({
  _id: obj.id,
  name: obj.name.toLowerCase(),
  food_group: obj.food_group,
  food_subgroup: obj.food_subgroup,
  image: ""
}));

const filteredJson = JSON.stringify(filteredData, null, 2);
fs.writeFileSync('../resources/ingredients.json', filteredJson);

console.log('Filtered data has been written to ../resources/ingredients.json');
