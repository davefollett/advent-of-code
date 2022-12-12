// https://adventofcode.com/2022/day/7

import fs from 'fs';
import os from 'os';
import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';

function initFileSystem(filename) {
  const fileSystem = {
    '/': {
      parentDir: null,
      size: 0,
      files: [],
      subDirs: {},
    },
  };

  let currentDir = fileSystem;
  let parseMode = '';

  fs.readFileSync(filename, 'utf-8')
    .split(os.EOL)
    .forEach((command) => {
      if (command === '$ cd /') {
        parseMode = 'cd';
        currentDir = fileSystem['/'];
      } else if (command === '$ cd ..') {
        parseMode = 'cd';
        currentDir = currentDir.parentDir;
      } else if (command.startsWith('$ cd')) {
        parseMode = 'cd';
        const [, , dirName] = command.split(' ');
        currentDir = currentDir.subDirs[dirName];
      } else if (command.startsWith('$ ls')) {
        parseMode = 'ls';
      } else if (parseMode === 'ls') {
        if (command.startsWith('dir')) {
          const [, dirName] = command.split(' ');
          currentDir.subDirs[dirName] = {
            parentDir: currentDir,
            size: 0,
            files: [],
            subDirs: {},
          };
        } else {
          const [sizeStr, fileName] = command.split(' ');
          const size = parseInt(sizeStr, 10);
          currentDir.files.push({ size, fileName });
          currentDir.size += size;
        }
      }
    });

  return fileSystem;
}

const dirs = [];

function dfs(currentDir) {
  let size = 0;

  for (const key of Object.keys(currentDir.subDirs)) {
    size += dfs(currentDir.subDirs[key]);
  }
  dirs.push(currentDir.size + size);

  return currentDir.size + size;
}

export function part1(filename) {
  const fileSystem = initFileSystem(filename);
  const LIMIT = 100000;
  const currentDir = fileSystem['/'];
  dirs.length = 0;

  dfs(currentDir);

  return dirs
    .filter((size) => size <= LIMIT)
    .reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

export function part2(filename) {
  const SPACE_AVAILABLE = 70000000;
  const UNUSED_MIN = 30000000;
  const fileSystem = initFileSystem(filename);

  const currentDir = fileSystem['/'];
  dirs.length = 0;
  const rootSize = dfs(currentDir);

  const currentUnused = SPACE_AVAILABLE - rootSize;
  const sizeNeeded = UNUSED_MIN - currentUnused;
  const filteredDirs = dirs.filter((size) => size >= sizeNeeded);

  return Math.min(...filteredDirs);
}

export function run() {
  const filename = './day-07/input.txt';
  const results = new Result('Day 07');

  let start = performance.now();
  results.part1.answer = part1(filename);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2(filename);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
}
