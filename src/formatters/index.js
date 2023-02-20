import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const formatTo = (format) => {
  if (format === 'plain') {
    return plain;
  }
  if (format === 'json') {
    return json;
  }

  return stylish;
};

export default formatTo;
