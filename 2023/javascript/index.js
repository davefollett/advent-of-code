import express from 'express';
import template from './utils/template.js';
import { run as day01Run } from './day-01/index.js';
import { run as day02Run } from './day-02/index.js';
import { run as day03Run } from './day-03/index.js';
import { run as day04Run } from './day-04/index.js';
import { run as day05Run } from './day-05/index.js';
import { run as day06Run } from './day-06/index.js';
import { run as day07Run } from './day-07/index.js';
import { run as day08Run } from './day-08/index.js';
import { run as day10Run } from './day-10/index.js';
import { run as day11Run } from './day-11/index.js';
import { run as day14Run } from './day-14/index.js';
import { run as day15Run } from './day-15/index.js';

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

const sidebar = `
  <a class="link" href="/">Home</a>
  <a class="link" href="/day-01">Day 01</a>
  <a class="link" href="/day-02">Day 02</a>
  <a class="link" href="/day-03">Day 03</a>
  <a class="link" href="/day-04">Day 04</a>
  <a class="link" href="/day-05">Day 05</a>
  <a class="link" href="/day-06">Day 06</a>
  <a class="link" href="/day-07">Day 07</a>
  <a class="link" href="/day-08">Day 08</a>
  <a class="link" href="/day-10">Day 10</a>
  <a class="link" href="/day-11">Day 11</a>
  <a class="link" href="/day-14">Day 14</a>
  <a class="link" href="/day-15">Day 15</a>
`;

app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}...`);
});

process.on('SIGINT', () => process.exit(0));

app.get('/', (req, res) => {
  res.send(template(`<h1>Welcome to Dave Follett's Advent of Code Solutions.</h1>
                     <p>Click each link in the sidebar to run each day's solution.</p>`, sidebar));
});

app.get('/day-01', (req, res) => {
  const results = day01Run();
  res.send(template(formatResult(results), sidebar));
});

app.get('/day-02', (req, res) => {
  const results = day02Run();
  res.send(template(formatResult(results), sidebar));
});

app.get('/day-03', (req, res) => {
  const results = day03Run();
  res.send(template(formatResult(results), sidebar));
});

app.get('/day-04', (req, res) => {
  const results = day04Run();
  res.send(template(formatResult(results), sidebar));
});

app.get('/day-05', (req, res) => {
  const results = day05Run();
  res.send(template(formatResult(results), sidebar));
});

app.get('/day-06', (req, res) => {
  const results = day06Run();
  res.send(template(formatResult(results), sidebar));
});

app.get('/day-07', (req, res) => {
  const results = day07Run();
  res.send(template(formatResult(results), sidebar));
});

app.get('/day-08', (req, res) => {
  const results = day08Run();
  res.send(template(formatResult(results), sidebar));
});

app.get('/day-10', (req, res) => {
  const results = day10Run();
  res.send(template(formatResult(results), sidebar));
});

app.get('/day-11', (req, res) => {
  const results = day11Run();
  res.send(template(formatResult(results), sidebar));
});

app.get('/day-14', (req, res) => {
  const results = day14Run();
  res.send(template(formatResult(results), sidebar));
});

app.get('/day-15', (req, res) => {
  const results = day15Run();
  res.send(template(formatResult(results), sidebar));
});
