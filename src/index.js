import { readFileSync } from 'fs';
import _ from 'lodash';
import { resolve } from 'node:path';
import { cwd } from 'node:process';
import parser from './parsers.js';
import formatTo from './formatters/index.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const dataRead = (filePath) => readFileSync(filePath, 'utf-8');
  const path1 = resolve(cwd(), filepath1);
  const path2 = resolve(cwd(), filepath2);
  const data1 = dataRead(path1);
  const data2 = dataRead(path2);

  const parsedData1 = parser(path1, data1);
  const parsedData2 = parser(path2, data2);

  const makeDiffTree = (obj1, obj2) => {
    const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
    const diffTree = keys.map((key) => {
      if (!_.has(obj2, key)) {
        return { name: key, status: 'deleted', value: obj1[key] };
      }
      if (!_.has(obj1, key)) {
        return { name: key, status: 'added', value: obj2[key] };
      }
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        return { name: key, status: 'nested', value: makeDiffTree(obj1[key], obj2[key]) };
      }
      if (obj1[key] !== obj2[key]) {
        return {
          name: key,
          status: 'changed',
          previousValue: obj1[key],
          currentValue: obj2[key],
        };
      }
      return { name: key, status: 'unchanged', value: obj1[key] };
    });
    return diffTree;
  };

  const diffTree = makeDiffTree(parsedData1, parsedData2);
  const format = formatTo(formatName);
  console.log(format(diffTree));
  return format(diffTree);
};

export default gendiff;
