const formatValue = (val) => {
  if (typeof val === 'string') {
    return `'${val}'`;
  }
  if (typeof val !== 'object' || val === null) {
    return val;
  }

  return '[complex value]';
};

const plain = (diffTree) => {
  const iter = (node, path) => {
    const formattedTree = node.flatMap((child) => {
      switch (child.status) {
        case 'added':
          return `Property '${path + child.name}' was added with value: ${formatValue(child.value)}`;
        case 'deleted':
          return `Property '${path + child.name}' was removed`;
        case 'unchanged':
          return [];
        case 'changed':
          return `Property '${path + child.name}' was updated. From ${formatValue(child.previusValue)}\
 to ${formatValue(child.currentValue)}`;
        default:
          return iter(child.children, `${path}${child.name}.`);
      }
    });
    return [...formattedTree].join('\n');
  };

  return iter(diffTree, '');
};

export default plain;
