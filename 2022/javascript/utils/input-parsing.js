import fs from 'fs';
import os from 'os';

export default function toArrayOfStrings(filename) {
  const results = fs.readFileSync(filename, 'utf-8')
    .split(os.EOL);

  return results;
}
