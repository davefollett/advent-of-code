const fs = require("fs");
const day06 = require("./index.js");

test('Part 1 run(TEST)', () => {

  let input = fs.readFileSync("./day-06/test.txt", 'utf-8');
  expect(day06.part1(input)).toBe(42);
});

test('Part 1 run(REAL)', () => {

  let input = fs.readFileSync("./day-06/input.txt", 'utf-8');
  expect(day06.part1(input)).toBe(154386);
});

test('Part 2 run(TEST)', () => {

  let input = fs.readFileSync("./day-06/test2.txt", 'utf-8');
  expect(day06.part2(input)).toBe(4);
});

test('Part 2 run(REAL)', () => {

  let input = fs.readFileSync("./day-06/input.txt", 'utf-8');
  expect(day06.part2(input)).toBe(346);
});