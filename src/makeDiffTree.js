import _ from 'lodash';

const makeDiffTree = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const diffTree = keys.map((key) => {
    if (!_.has(obj2, key)) {
      return { name: key, status: 'deleted', value: obj1[key] };
    }
    if (!_.has(obj1, key)) {
      return { name: key, status: 'added', value: obj2[key] };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { name: key, status: 'nested', children: makeDiffTree(obj1[key], obj2[key]) };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        name: key,
        status: 'changed',
        previusValue: obj1[key],
        currentValue: obj2[key],
      };
    }
    return { name: key, status: 'unchanged', value: obj1[key] };
  });
  return diffTree;
};

export default makeDiffTree;
