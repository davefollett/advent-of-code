const readline = require("readline");
const fs = require("fs");

let results = {
  title: "Day 01",
  part1: {
    answer: "TBD",
    time: 0,
  },
  part2: {
    answer: "TBD",
    time: 0,
  }
}

function part1() {

  var result = 0;
  const rl = readline.createInterface({
    input: fs.createReadStream("./day-01/input.txt"),
    crlfDelay: Infinity
  });

  rl.on("line", line => {
    result += parseInt(line, 10);
  }).on("close", () => {
    results.part1.answer = result.toString()
  });
}

exports.run = function run() {
  part1();
  return results;
}