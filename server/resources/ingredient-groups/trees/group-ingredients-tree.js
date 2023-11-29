import fs from 'fs';

const rawData = fs.readFileSync('../ingredients.json');
const originalData = JSON.parse(rawData);

function buildTree(data) {
  const tree = {};

  data.forEach(obj => {
    const { food_group, food_subgroup } = obj;

    if (!tree[food_group]) {
      tree[food_group] = { [food_subgroup]: [] };
    } else {
      if (!tree[food_group][food_subgroup]) {
        tree[food_group][food_subgroup] = [];
      }
    }
  });

  return tree;
}

const tree = buildTree(originalData);

const treeJson = JSON.stringify(tree, null, 2);
fs.writeFileSync('./tree.json', treeJson);

console.log('Tree created');
