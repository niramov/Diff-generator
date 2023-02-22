import yaml from 'js-yaml';

const parse = (data, extention) => {
  switch (extention) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error('Invalid file format! Try supported formats.');
  }
};

export default parse;
