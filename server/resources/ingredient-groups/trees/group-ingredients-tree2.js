import fs from 'fs';

const rawData = fs.readFileSync('../ingredients.json');
const originalData = JSON.parse(rawData);

function buildTree(data) {
  const tree = {};

  data.forEach(obj => {
    const { food_group, food_subgroup, name } = obj;

    if (!tree[food_group]) {
      tree[food_group] = { [food_subgroup]: [name] };
    } else {
      if (!tree[food_group][food_subgroup]) {
        tree[food_group][food_subgroup] = [name];
      } else {
        tree[food_group][food_subgroup].push(name);
      }
    }
  });

  return tree;
}

const tree = buildTree(originalData);

const treeJson = JSON.stringify(tree, null, 2);
fs.writeFileSync('./tree2.json', treeJson);

console.log('Tree created');
