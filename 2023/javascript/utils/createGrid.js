import fileParser from './file-parser.js';

function lineParserGrid(line) {
  return line.split('');
}

export default function createGrid(filename) {
  const grid = fileParser(filename, lineParserGrid);
  return grid;
}
