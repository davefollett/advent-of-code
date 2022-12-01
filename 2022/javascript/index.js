// let express = require("express");
import express from 'express';
import template from './utils/template.js';
import { run as day01Run } from './day-01/index.js';
// const day01 = require("./day-01");
// const day02 = require("./day-02");
// const day03 = require("./day-03");
// const day04 = require("./day-04");
// const day05 = require("./day-05");
// const day06 = require("./day-06");

const PORT = 8080;

const app = express();
app.use(express.static('assets'));

function formatResult(result) {
  return `
    <h1>${result.title}</h1>
    <ui>
      <li>Part 1: ${result.part1.answer} (${result.part1.time} ms)</li>
      <li>Part 2: ${result.part2.answer} (${result.part2.time} ms)</li>
    <ui>
  `;
}

app.get('/', (req, res) => {
  res.send(
    template(`
    <h1>Welcome to Dave Follett's Advent of Code Solutions.</h1>
    <p>Click each link in the sidebar to run each day's solution.</p>
  `),
  );
});

app.get('/day-01', (req, res) => {
  const results = day01Run();
  res.send(template(formatResult(results)));
});

// app.get("/day-02", (req, res) => {
//   const results = day02.run();
//   res.send(template(formatResult(results)));
// });

// app.get("/day-03", (req, res) => {
//   const results = day03.run();
//   res.send(template(formatResult(results)));
// });

// app.get("/day-04", (req, res) => {
//   const results = day04.run();
//   res.send(template(formatResult(results)));
// });

// app.get("/day-05", (req, res) => {
//   const results = day05.run();
//   res.send(template(formatResult(results)));
// });

// app.get("/day-06", (req, res) => {
//   const results = day06.run();
//   res.send(template(formatResult(results)));
// });

app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}...`);
});
