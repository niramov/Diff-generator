import parse from './parsers.js';
import formatTo from './formatters/index.js';
import makeDiffTree from './makeDiffTree.js';
import { getAbsolutePath, readData, getExtension } from './utils.js';

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const path1 = getAbsolutePath(filepath1);
  const path2 = getAbsolutePath(filepath2);
  const data1 = readData(path1);
  const data2 = readData(path2);

  const parsedData1 = parse(data1, getExtension(path1));
  const parsedData2 = parse(data2, getExtension(path2));

  const diffTree = makeDiffTree(parsedData1, parsedData2);
  const format = formatTo(formatName);
  return format(diffTree);
};

export default gendiff;
