import { readFileSync } from 'fs';
import _ from 'lodash';
import { resolve } from 'node:path';
import { cwd } from 'node:process';
import parser from './parsers.js';

const gendiff = (filepath1, filepath2) => {
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
        return { name: key, status: 'nested', children: makeDiffTree(obj1[key], obj2[key]) };
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

  const stringify = (diff, replacer = ' ', spacesCount = 2) => {
    const iter = (node, depth) => {
      const intendSize = depth * spacesCount;
      const currentIntend = replacer.repeat(intendSize);
      const backquoteIntend = replacer.repeat(intendSize - spacesCount);

      const formattedTree = node.map((child) => {
        if (child.status === 'added') {
          return `${currentIntend}+ ${child.name}: ${child.value}`;
        }
        if (child.status === 'deleted') {
          return `${currentIntend}- ${child.name}: ${child.value}`;
        }
        if (child.status === 'unchanged') {
          return `${currentIntend}  ${child.name}: ${child.value}`;
        }
        if (child.status === 'changed') {
          return `${currentIntend}- ${child.name}: ${child.previousValue}\n${currentIntend}+ ${child.name}: ${child.currentValue}`;
        }
        return `${currentIntend}  ${child.name}: ${iter(child.children, depth + 2)}`;
      });
      return ['{', ...formattedTree, `${backquoteIntend}}`].join('\n');
    };
    return iter(diff, 1);
  };
  return stringify(diffTree);
};

export default gendiff;
