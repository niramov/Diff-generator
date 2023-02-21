import yaml from 'js-yaml';
import { extname } from 'node:path';

const parse = (path, data) => {
  console.log(extname(path));
  switch (extname(path)) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
      return yaml.load(data);
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error('Invalid file format! Try supported formats.');
  }
};

export default parse;
