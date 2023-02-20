const stylish = (diff, replacer = ' ', spacesCount = 4) => {
  const iter = (node, depth) => {
    const intendSize = depth * spacesCount - 2;
    const currentIntend = replacer.repeat(intendSize);
    const backquoteIntend = replacer.repeat(intendSize - 2);

    const isObject = (val, objDepth, objReplacer = ' ', objSpacesCount = 4) => {
      if (typeof val !== 'object' || val === null) {
        return val;
      }
      const objIntendSize = objDepth * objSpacesCount;
      const objCurrentIntend = objReplacer.repeat(objIntendSize);
      const objBackquoteIntend = objReplacer.repeat(objIntendSize - objSpacesCount);
      const result = [];
      const entries = Object.entries(val);
      entries.forEach(([key, value]) => {
        result.push(`${objCurrentIntend}${key}: ${isObject(value, objDepth + 1)}`);
      });
      return ['{', ...result, `${objBackquoteIntend}}`].join('\n');
    };

    const formattedTree = node.map((child) => {
      if (child.status === 'added') {
        return `${currentIntend}+ ${child.name}: ${isObject(child.value, depth + 1)}`;
      }
      if (child.status === 'deleted') {
        return `${currentIntend}- ${child.name}: ${isObject(child.value, depth + 1)}`;
      }
      if (child.status === 'unchanged') {
        return `${currentIntend}  ${child.name}: ${isObject(child.value, depth + 1)}`;
      }
      if (child.status === 'changed') {
        return `${currentIntend}- ${child.name}: ${isObject(child.previousValue, depth + 1)}\n${currentIntend}+ ${
          child.name
        }: ${isObject(child.currentValue, depth + 1)}`;
      }
      return `${currentIntend}  ${child.name}: ${iter(child.value, depth + 1)}`;
    });

    return ['{', ...formattedTree, `${backquoteIntend}}`].join('\n');
  };
  return iter(diff, 1);
};

export default stylish;
