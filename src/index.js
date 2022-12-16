import { readFileSync } from "fs";
import _ from 'lodash';

export default ((filepath1, filepath2) => {

  const dataRead = (path) => readFileSync(path, 'utf-8');
  const data1 = dataRead(filepath1);
  const data2 = dataRead(filepath2);

  const parsedData1 = JSON.parse(data1);
  const parsedData2 = JSON.parse(data2);

  const keys1 = _.keys(parsedData1);
  const keys2 = _.keys(parsedData2);
  const uniqueKeys = _.union(keys1, keys2);

  console.log('!!!!', parsedData1);

const diff = uniqueKeys.reduce((acc, key) => {
    if(!_.has(parsedData1, key)) {
     acc[key] = `+ ${parsedData2[key]}`;
    } else if (!_.has(parsedData2, key)) {
     acc[key] = `- ${parsedData1[key]}`;
    } else if (parsedData1[key] === parsedData2[key]) {
     acc[key] = `${parsedData1[key]}`;
    } else {
     acc[key] = (`- ${parsedData1[key]}`);
     acc[key] = `+ ${parsedData2[key]}`;
    }
    return acc;
  }, {});

  return diff;
});
