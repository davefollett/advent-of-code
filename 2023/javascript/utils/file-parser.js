import fs from 'fs';
import os from 'os';

function defaultLineParser(line) { return line; }

export default function fileParser(filename, lineParser = defaultLineParser) {
  const results = fs.readFileSync(filename, 'utf-8')
    .split(os.EOL)
    .map((line) => lineParser(line));

  return results;
}

export function fileParserToObject(filename, lineParser) {
  const results = {};
  fs.readFileSync(filename, 'utf-8')
    .split(os.EOL)
    .forEach((line) => {
      const { key, value } = lineParser(line);
      results[key] = value;
    });

  return results;
}
