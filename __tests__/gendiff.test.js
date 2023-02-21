/* eslint-disable no-undef */
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';

import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '_fixtures_', filename);

test('JSON stylish', () => {
  const result = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expected = readFileSync(getFixturePath('stylish.txt'), 'utf-8');

  expect(result).toStrictEqual(expected);
});

test('YML stylsih', () => {
  const result = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  const expected = readFileSync(getFixturePath('stylish.txt'), 'utf-8');

  expect(result).toStrictEqual(expected);
});

test('JSON plain', () => {
  const result = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  const expected = readFileSync(getFixturePath('plain.txt'), 'utf-8');

  expect(result).toStrictEqual(expected);
});

test('YML plain', () => {
  const result = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain');
  const expected = readFileSync(getFixturePath('plain.txt'), 'utf-8');

  expect(result).toStrictEqual(expected);
});

test('JSON json', () => {
  const result = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
  const expected = readFileSync(getFixturePath('json.txt'), 'utf-8');

  expect(result).toStrictEqual(expected);
});

test('YML json', () => {
  const result = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json');
  const expected = readFileSync(getFixturePath('json.txt'), 'utf-8');

  expect(result).toStrictEqual(expected);
});
