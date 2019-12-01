const readline = require("readline");
const fs = require("fs");
const { performance } = require("perf_hooks");

let results = {
  title: "Day 01",
  part1: {
    answer: "TBD",
    time: 0
  },
  part2: {
    answer: "TBD",
    time: 0
  }
};

function part1() {
  return new Promise((resolve, reject) => {
    var sum = 0;
    const rl = readline.createInterface({
      input: fs.createReadStream("./day-01/input.txt"),
      crlfDelay: Infinity
    });

    rl.on("line", line => {
      sum += parseInt(line, 10);
    })
      .on("close", () => {
        resolve(sum.toString());
      })
      .on("error", err => {
        reject(err); // rejecting the error, so we can catch it in the promise chain
      });
  });
}

exports.run = async function run() {
  const start = performance.now();
  results.part1.answer = await part1();
  results.part1.time = (performance.now() - start).toFixed(2);

  return results;
};
