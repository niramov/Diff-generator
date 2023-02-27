const countIndent = (depth, spotter = 2) => ' '.repeat(depth * 4 - spotter);

const stringify = (val, objDepth) => {
  if (typeof val !== 'object' || val === null) {
    return val;
  }

  const entries = Object.entries(val);
  const result = entries.map(([key, value]) => `${countIndent(objDepth)}  ${key}: ${stringify(value, objDepth + 1)}`);
  return ['{', ...result, `${countIndent(objDepth, 4)}}`].join('\n');
};

const stylish = (diff) => {
  const iter = (node, depth) => {
    const formattedTree = node.map((child) => {
      const newNode = stringify(child.value, depth + 1);
      switch (child.status) {
        case 'added':
          return `${countIndent(depth)}+ ${child.name}: ${newNode}`;
        case 'deleted':
          return `${countIndent(depth)}- ${child.name}: ${newNode}`;
        case 'unchanged':
          return `${countIndent(depth)}  ${child.name}: ${newNode}`;
        case 'changed':
          return `${countIndent(depth)}- ${child.name}: \
${stringify(child.previusValue, depth + 1)}\n${countIndent(depth)}+ ${child.name}: \
${stringify(child.currentValue, depth + 1)}`;
        default:
          return `${countIndent(depth)}  ${child.name}: ${iter(child.children, depth + 1)}`;
      }
    });

    return ['{', ...formattedTree, `${countIndent(depth, 4)}}`].join('\n');
  };
  return iter(diff, 1);
};

export default stylish;
