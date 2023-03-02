import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const formatTo = (format) => {
  switch (format) {
    case 'plain':
      return plain;
    case 'json':
      return json;
    case 'stylish':
      return stylish;
    default:
      throw new Error(`Not supported format ${format}!`);
  }
};

export default formatTo;
