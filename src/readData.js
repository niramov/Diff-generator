import { readFileSync } from 'fs';
import { resolve } from 'node:path';
import { cwd } from 'node:process';

const getPath = (filePath) => resolve(cwd(), filePath);

const readData = (filePath) => readFileSync(getPath(filePath), 'utf-8');

export { readData, getPath };
