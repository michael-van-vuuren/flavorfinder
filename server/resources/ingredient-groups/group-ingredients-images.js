import fs from 'fs';

const rawData = fs.readFileSync('../ingredients.json');
const originalData = JSON.parse(rawData);

function buildTree(data) {
  const tree = {};

  data.forEach(obj => {
    const { food_group, food_subgroup, image } = obj;

    if (!tree[food_group]) {
      tree[food_group] = { image, [food_subgroup]: { image } };
    } else {
      if (!tree[food_group][food_subgroup]) {
        tree[food_group][food_subgroup] = { image };
      }
    }
  });

  return tree;
}

const tree = buildTree(originalData);

const output = JSON.stringify(tree, null, 2);
fs.writeFileSync('./ingredient-image-paths.json', output);

console.log('success');
