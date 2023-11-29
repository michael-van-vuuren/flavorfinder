import fs from 'fs';

function generateDot(data) {
  let dotCode = 'digraph G {\n';
  dotCode += '  rankdir=LR;\n';
  dotCode += '  ranksep="3.0";\n';

  function processNode(node, parent = null) {
    if (Array.isArray(node)) {
      node.forEach(item => processNode(item, parent));
    } else if (typeof node === 'object') {
      for (const [key, value] of Object.entries(node)) {
        const nodeId = key;
        if (parent !== null && parent !== nodeId) {
          dotCode += `  "${parent}" -> "${nodeId}" ;\n`;
        }
        processNode(value, nodeId);
      }
    } else {
      const leafNode = node;
      if (parent !== null && parent !== leafNode) {
        dotCode += `  "${parent}" -> "${leafNode}" ;\n`;
      }
    }
  }

  processNode(data);
  dotCode += '}';

  return dotCode;
}

const jsonData = fs.readFileSync('tree2.json', 'utf8');
const data = JSON.parse(jsonData);

const dotCode = generateDot(data);

fs.writeFileSync('tree2.dot', dotCode);

console.log('tree2.dot created');
