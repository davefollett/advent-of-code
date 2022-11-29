export default function template(body) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Dave Follett's 2022 Advent of Code</title>
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

      @media all and (max-width: 800px) {
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
            <h1>2022 Advent of Code</h1>
          </div>
        </header>
      
        <aside>
          <div class="cell nes-container is-dark">
            <a class="link" href="/">Home</a>
            <a class="link" href="/day-01">Day 01</a>
          </div>
        </aside>
      
        <main>
          <div class="cell nes-container is-dark">
              <p >${body}</p>
            </div>
        </main>
      
        <footer>
          <div class="cell nes-container is-dark">
            <p>&copy; 2022 Dave Follett</p>
          </div>
        </footer>
      </div>
  </body>
<html>
`;
}
