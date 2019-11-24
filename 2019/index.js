let express = require('express');

const day01 = require('./day-01')

const PORT = 8080;

let app = express();

function formatResult(result) {
  return `
    <h1>${result.title}</h1>
    <ui>
      <li>Part 1: ${result.part1.answer} (${result.part1.time} ms)</li>
      <li>Part 2: ${result.part2.answer} (${result.part2.time} ms)</li>
    <ui>
  `
}

app.get('/', (req, res) => {
  res.send(template(`
    <h1>Welcome to the Dave Follett's Advent of Code Solutions.</h1>
    <p>Click each link in the sidebar to run each day's solution.</p>
  `));
});

app.get('/day-01', (req, res) => {
  res.send(template(formatResult(day01.run())));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

let template = body => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <title>Dave Follett's 2019 Advent of Code</title>
      <style>
        body {
          font-family: sans-serif;
          display: grid;
          grid-template-columns: 25% 75%;
          grid-template-rows: 10vw 30vw 10vw;
          grid-gap: 1em;
        }

        header,
        footer {
          grid-column: 1 / span 2;
        }

        /* Demo Specific Styles */
        body {
          margin: 0 auto;
          max-width: 56em;
          padding: 1em 0;
        }

        header,
        footer {
          background: #eaeaea;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
        }

        main,
        aside {
          background: #eaeaea;
          display: flex;
          flex-direction: column;
          align-items: left;
        }
      </style>
    </head>

    <body>
      <header>
      <div class="logo">2019 Advent of Code</div>
      </header>

      <aside>
        <a class="link" href="/">Home</a>
        <a class="link" href="/day-01">Day 1</a>
      </aside>

      <main>
        ${body}
      </main>

      <footer>
        <p>&copy; 2019 Dave Follett</p>
      </footer>

    </body>
  <html>
  `;
