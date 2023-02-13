import yaml from 'js-yaml';
import { extname } from 'node:path';

const parser = (path, data) => {
  if (extname(path) === 'json') {
    return JSON.parse(data);
  }
  return yaml.load(data);
};

export default parser;
