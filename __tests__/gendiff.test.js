/* eslint-disable no-undef */
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '_fixtures_', filename);

test('proper function behavior with JSON', () => {
  const result = gendiff(getFixturePath('file1.json'), (getFixturePath('file2.json')));
  const expected = readFileSync((getFixturePath('proper')), 'utf-8');

  expect(result).toStrictEqual(expected);
});

test('proper function behavior with YML', () => {
  const result = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  const expected = readFileSync(getFixturePath('proper'), 'utf-8');

  expect(result).toStrictEqual(expected);
});
