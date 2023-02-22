import { readFileSync } from 'fs';
import { resolve } from 'node:path';
import { cwd } from 'node:process';
import { extname } from 'path';

const getAbsolutePath = (filePath) => resolve(cwd(), filePath);
const getExtention = (path) => extname(path).substring(1);
const readData = (filePath) => readFileSync(getAbsolutePath(filePath), 'utf-8');

export { readData, getAbsolutePath, getExtention };
