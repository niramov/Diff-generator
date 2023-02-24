/* eslint-disable no-undef */
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '_fixtures_', filename);

const extension = ['yaml', 'yml', 'json'];

const expectedStylish = readFileSync(getFixturePath('stylish.txt'), 'utf-8');
const expectedPlain = readFileSync(getFixturePath('plain.txt'), 'utf-8');
const expectedJson = readFileSync(getFixturePath('json.txt'), 'utf-8');

test.each(extension)('formatters', (ext) => {
  const fileBefore = getFixturePath(`file1.${ext}`);
  const fileAfter = getFixturePath(`file2.${ext}`);

  expect(gendiff(fileBefore, fileAfter, 'stylish')).toEqual(expectedStylish);
  expect(gendiff(fileBefore, fileAfter, 'plain')).toEqual(expectedPlain);
  expect(gendiff(fileBefore, fileAfter, 'json')).toEqual(expectedJson);
  expect(gendiff(fileBefore, fileAfter, '')).toEqual(expectedStylish);
});

// test('JSON stylish', () => {
//   const result = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
//   const expected = readFileSync(getFixturePath('stylish.txt'), 'utf-8');

//   expect(result).toStrictEqual(expected);
// });

// test('YML stylsih', () => {
//   const result = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
//   const expected = readFileSync(getFixturePath('stylish.txt'), 'utf-8');

//   expect(result).toStrictEqual(expected);
// });

// test('JSON plain', () => {
//   const result = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
//   const expected = readFileSync(getFixturePath('plain.txt'), 'utf-8');

//   expect(result).toStrictEqual(expected);
// });

// test('YML plain', () => {
//   const result = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain');
//   const expected = readFileSync(getFixturePath('plain.txt'), 'utf-8');

//   expect(result).toStrictEqual(expected);
// });

// test('JSON json', () => {
//   const result = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json');
//   const expected = readFileSync(getFixturePath('json.txt'), 'utf-8');

//   expect(result).toStrictEqual(expected);
// });

// test('YML json', () => {
//   const result = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json');
//   const expected = readFileSync(getFixturePath('json.txt'), 'utf-8');

//   expect(result).toStrictEqual(expected);
// });
