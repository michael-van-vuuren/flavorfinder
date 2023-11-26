import fs from 'fs';

function generateDot(data, parent = null) {
  if (parent !== data) {
    let dotCode = `${parent ? `  "${parent}" -> ` : ''} "${data}" ;\n`;

    if (typeof data === 'object' && !Array.isArray(data)) {
      for (const [key, value] of Object.entries(data)) {
        dotCode += generateDot(value, key);
      }
    }

    return dotCode;
  } else {
    return '';
  }
}

const jsonData = fs.readFileSync('tree.json', 'utf8');
const treeData = JSON.parse(jsonData);

let dotCode = 'digraph G {\n';
dotCode += '  rankdir=LR;\n';
dotCode += '  ranksep="3.0";\n';

function traverseTree(tree, parentKey = null) {
  for (const [key, value] of Object.entries(tree)) {
    dotCode += generateDot(key, parentKey);
    if (typeof value === 'object') {
      traverseTree(value, key);
    }
  }
}

traverseTree(treeData);

dotCode += '}\n';

fs.writeFileSync('tree.dot', dotCode);

console.log('tree.dot created');
