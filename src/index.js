import parse from './parsers.js';
import formatTo from './formatters/index.js';
import makeDiffTree from './makeDiffTree.js';
import { getPath, readData } from './readData.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const path1 = getPath(filepath1);
  const path2 = getPath(filepath2);
  const data1 = readData(path1);
  const data2 = readData(path2);

  const parsedData1 = parse(path1, data1);
  const parsedData2 = parse(path1, data2);

  const diffTree = makeDiffTree(parsedData1, parsedData2);
  const format = formatTo(formatName);
  return format(diffTree);
};

export default gendiff;
