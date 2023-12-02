import express from 'express';
import template from './utils/template.js';
import { run as day01Run } from './day-01/index.js';

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
`;

app.listen(PORT, () => {
  console.info(`Listening on port ${PORT}...`);
});

app.get('/', (req, res) => {
  res.send(template(`<h1>Welcome to Dave Follett's Advent of Code Solutions.</h1>
                     <p>Click each link in the sidebar to run each day's solution.</p>`, sidebar));
});

app.get('/day-01', (req, res) => {
  const results = day01Run();
  res.send(template(formatResult(results), sidebar));
});
