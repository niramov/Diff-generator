import plain from './plain.js';
import stylish from './stylish.js';

const formatTo = (format) => {
  if (format === 'plain') {
    return plain;
  }
  return stylish;
};

export default formatTo;
