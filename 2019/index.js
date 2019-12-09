let express = require("express");
const day01 = require("./day-01");
const day02 = require("./day-02");
const day03 = require("./day-03");
const day04 = require("./day-04");
const day05 = require("./day-05");
const day06 = require("./day-06");

const PORT = 8080;

let app = express();
app.use(express.static("assets"));

function formatResult(result) {
  return `
    <h1>${result.title}</h1>
    <ui>
      <li>Part 1: ${result.part1.answer} (${result.part1.time} ms)</li>
      <li>Part 2: ${result.part2.answer} (${result.part2.time} ms)</li>
    <ui>
  `;
}

app.get("/", (req, res) => {
  res.send(
    template(`
    <h1>Welcome to Dave Follett's Advent of Code Solutions.</h1>
    <p>Click each link in the sidebar to run each day's solution.</p>
  `)
  );
});

app.get("/day-01", (req, res) => {
  const results = day01.run();
  res.send(template(formatResult(results)));
});

app.get("/day-02", (req, res) => {
  const results = day02.run();
  res.send(template(formatResult(results)));
});

app.get("/day-03", (req, res) => {
  const results = day03.run();
  res.send(template(formatResult(results)));
});

app.get("/day-04", (req, res) => {
  const results = day04.run();
  res.send(template(formatResult(results)));
});

app.get("/day-05", (req, res) => {
  const results = day05.run();
  res.send(template(formatResult(results)));
});

app.get("/day-06", (req, res) => {
  const results = day06.run();
  res.send(template(formatResult(results)));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

let template = body => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Dave Follett's 2019 Advent of Code</title>
    <link href="https://fonts.googleapis.com/css?family=Press+Start+2P" rel="stylesheet" />
    <link href="https://unpkg.com/nes.css@latest/css/nes.min.css" rel="stylesheet" />

    <style>

      html, body, pre, code, kbd, samp {
        font-family: 'Press Start 2P', cursive;
        background-color: #212529;
      }
      
      .grid {
        display: grid;
        grid-template-columns: 200px auto;
        grid-gap: 1em;
      }

      header, footer {
        grid-column: 1 / 3;
      }

      @media all and (max-width: 700px) {
        aside,
        main {
          grid-column: 1 / 3;
        }
      }

      body {
        margin: 0 auto;
        max-width: 56em;
        padding: 1em 0;
      }

      header,
      aside,
      main,
      footer {
        display: flex;
        justify-content: center;
        align-items: stretch;
      }

      .cell {
        flex: 1;
      }

    </style>
  </head>

  <body>
    <div class="grid">
        <header>
          <div class="cell nes-container is-dark">
            <h1>2019 Advent of Code</h1>
          </div>
        </header>
      
        <aside>
          <div class="cell nes-container is-dark">
            <a class="link" href="/">Home</a>
            <a class="link" href="/day-01">Day 01</a>
            <a class="link" href="/day-02">Day 02</a>
            <a class="link" href="/day-03">Day 03</a>
            <a class="link" href="/day-04">Day 04</a>
            <a class="link" href="/day-05">Day 05</a>
            <a class="link" href="/day-06">Day 06</a>
          </div>
        </aside>
      
        <main>
          <div class="cell nes-container is-dark">
              <p >${body}</p>
            </div>
        </main>
      
        <footer>
          <div class="cell nes-container is-dark">
            <p>&copy; 2019 Dave Follett</p>
          </div>
        </footer>
      </div>
  </body>
<html>
`;
