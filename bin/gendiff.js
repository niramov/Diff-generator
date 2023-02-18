#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../src/index.js';

const program = new Command();

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .option('-f, --format <type>', 'output format', 'stylish')
  .argument('<filepath1>', 'path to file1')
  .argument('<filepath2>', 'path to file2')
  .action((filepath1, filepath2) => {
    gendiff(filepath1, filepath2);
  });

program.parse();
