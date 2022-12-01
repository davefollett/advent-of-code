import fs from 'fs';
import os from 'os';

function defaultLineParser(line) { return line; }

export default function fileParser(filename, lineParser = defaultLineParser) {
  const results = fs.readFileSync(filename, 'utf-8')
    .split(os.EOL)
    .map((line) => lineParser(line));

  return results;
}
