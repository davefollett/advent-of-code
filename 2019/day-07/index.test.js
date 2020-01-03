//const readline = require("readline");
//const fs = require("fs");
const day07 = require("./index.js");


test('Day 07 run(REAL)', () => {
  let results = day07.run();
  //console.log(results);
  expect(results.part1.answer).toBe(65464);
});