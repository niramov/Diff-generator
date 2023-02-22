const isObject = (val) => {
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
      if (child.status === 'added') {
        return `Property '${path + child.name}' was added with value: ${isObject(child.value)}`;
      }
      if (child.status === 'deleted') {
        return `Property '${path + child.name}' was removed`;
      }
      if (child.status === 'unchanged') {
        return [];
      }
      if (child.status === 'changed') {
        return `Property '${path + child.name}' was updated. From ${isObject(child.previusValue)}\
 to ${isObject(child.currentValue)}`;
      }
      return iter(child.children, `${path}${child.name}.`);
    });
    return [...formattedTree].join('\n');
  };

  return iter(diffTree, '');
};

export default plain;
