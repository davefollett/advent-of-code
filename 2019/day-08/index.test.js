const fs = require("fs");
const day08 = require("./index.js");

test('decodeLayers(TEST)', () => {
  let input = "123456789012";
  let layers = day08.decodeLayers(input,3,2);
  expect(layers.length).toBe(2);
});

test('decodeLayers(TEST)', () => {
  let input = "123456789012";
  expect(day08.part1(input,3,2)).toBe(1);
});

test('Part 1 run(REAL)', () => {
  let input = fs.readFileSync("./day-08/input.txt", 'utf-8');
  expect(day08.part1(input,25,6)).toBe(2159);
});

test('Part 2 run(TEST)', () => {
  let input = "0222112222120000";
  day08.part2(input,2,2);
});

// Look in console should be CJZHR
test('Part 2 run(REAL)', () => {
  let input = fs.readFileSync("./day-08/input.txt", 'utf-8');
  day08.part2(input, 25, 6);
});