let express = require('express');

const PORT = 8080;

let app = express();

app.get('/', (req, res) => {
  res.send(template(`
    <h1>Welcome to the Dave Follett's Advent of Code Solutions.</h1>
    <p>Click each link in the sidebar to run each day's solution.</p>
  `));
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

/*
let template = body => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <style>
        body { font-family: sans-serif; }
        header { display: flex; padding: 10px; }
        .links { margin: auto; }
        main { padding: 10px; }
        .logo { font-size: 18px; letter-spacing: 2px; }
        .link { margin-right: 15px; }
      </style>
    </head>
    <body>
      <header>
        <div class="logo">2019 Advent of Code</div>
        <div class="links">
          <a class="link" href="/">Home</a>
          <a class="link" href="/about">About</a>
          <a class="link" href="/page-1">Page 1</a>
          <a class="link" href="/page-2">Page 2</a>
        </div>
      </header>
      <main>${body}</main>
      <footer>
      </footer>
    </body>
  </html>
`;
*/

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
        <a class="link" href="/day-1">Day 1</a>
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
