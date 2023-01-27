import { readFileSync } from 'fs';
import _ from 'lodash';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

const gendiff = (filepath1, filepath2) => {
  const dataRead = (path) => readFileSync(path, 'utf-8');
  const data1 = dataRead(resolve(cwd(), filepath1));
  const data2 = dataRead(resolve(cwd(), filepath2));

  const parsedData1 = JSON.parse(data1);
  const parsedData2 = JSON.parse(data2);

  const keys1 = _.keys(parsedData1);
  const keys2 = _.keys(parsedData2);
  const uniqueKeys = _.sortBy(_.union(keys1, keys2));

  const makeDiffTree = (names, file1, file2) => {
    const result = names.reduce((acc, item) => {
      if (!_.has(file1, item)) {
        acc.push({ node: item, value: file2[item], status: 'added' });
      } else if (!_.has(file2, item)) {
        acc.push({ node: item, value: file1[item], status: 'deleted' });
      } else if (file1[item] === file2[item]) {
        acc.push({ node: item, value: file2[item], status: 'stable' });
      } else {
        acc.push(
          { node: item, value: file1[item], status: '1' },
          { node: item, value: file2[item], status: '2' },
        );
      }
      return acc;
    }, []);
    return result;
  };

  const diffTree = makeDiffTree(uniqueKeys, parsedData1, parsedData2);

  const diffString = diffTree.reduce((acc, { node, value, status }) => {
    let tempAcc = acc;
    if (status === 'stable') {
      tempAcc += `    ${node}: ${value}\n`;
    } else if (status === 'added') {
      tempAcc += `  + ${node}: ${value}\n`;
    } else if (status === 'deleted') {
      tempAcc += `  - ${node}: ${value}\n`;
    } else if (status === '1') {
      tempAcc += `  - ${node}: ${value}\n`;
    } else {
      tempAcc += `  + ${node}: ${value}\n`;
    }
    return tempAcc;
  }, '');
  const result = `{\n${diffString}}`;

  return result;
};

export default gendiff;
