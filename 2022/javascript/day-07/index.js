// https://adventofcode.com/2022/day/7

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
// import fileParser from '../utils/file-parser.js';
import fs from 'fs';
import os from 'os';

function initFileSystem(filename) {

  const fileSystem = {
    '/': {
      parentDir: null,
      size: 0,
      files: [],
      subDirs: {}
    }
  }

  let currentDir = fileSystem;
  let parseMode = '';

  fs.readFileSync(filename, 'utf-8')
    .split(os.EOL)
    .forEach(command => {
      // console.log(command);
      if (command === '$ cd /') {
        parseMode = 'cd';
        // console.log('cd to root');
        currentDir = fileSystem['/'];
      } else if (command === '$ cd ..') {
        parseMode = 'cd';
        currentDir = currentDir['parentDir'];
      } else if (command.startsWith('$ cd')) {
        parseMode = 'cd';
        const [ , , dirName ] = command.split(' ');
        // console.log(`cd to ${dirName}`);
        currentDir = currentDir['subDirs'][dirName];
      } else if (command.startsWith('$ ls')) {
        parseMode = 'ls';
        // console.log('enter ls mode');
      } else if(parseMode === 'ls') {
        if (command.startsWith('dir')) {
          const [ , dirName ] = command.split(' ');
          // console.log(dirName)
          // console.log(currentDir['size'])
          currentDir['subDirs'][dirName] = {
            parentDir: currentDir,
            size: 0,
            files: [],
            subDirs: {},
          }
        } else {
          const [ sizeStr, fileName ] = command.split(' ');
          const size = parseInt(sizeStr, 10);
          currentDir['files'].push({size,fileName})
          currentDir['size'] += size;
        }
      }
      // console.log(currentDir);
    });

  // console.log(fileSystem['/']['subDirs']['a']['subDirs']['e']);
  // console.log(fileSystem['/']);

  return fileSystem;
}

const dirs = [];

function dfs(currentDir, limit) { 

  let size = 0;

  for (const [key, value] of Object.entries(currentDir['subDirs'])) {
    // console.log(key)
    size = dfs(currentDir['subDirs'][key], limit)
    if (size <= limit) {
      // console.log('push', size)
      dirs.push(size);
    } else {
      // console.log('too big',size)
    }
  }

  return currentDir['size'] + size;
}


// 836301 -- too low
export function part1(filename) {
  const fileSystem = initFileSystem(filename);
  const LIMIT = 100000;
  let currentDir = fileSystem['/'];
  dirs.length = 0

  const size = dfs(currentDir, LIMIT);
  if (size <= LIMIT) {
    // console.log('push', size)
    dirs.push(size);
  }

  return dirs.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

export function part2(filename) {
  const signal = fs.readFileSync(filename, 'utf-8')
  
  return 0;
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
