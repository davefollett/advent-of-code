
function defaultChunkParser(chunk) {
  return chunk;
}

export function chunk(arr, size, parser = defaultChunkParser) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    const chunk = arr.slice(i, i + size);
    result.push(parser(chunk));
  }

  return result;
}

export function sortNumbersAscending(arr) {
  return arr.sort((a, b) => a - b);
}

export function sortNumbersDescending(arr) {
  return arr.sort((a, b) => b - a);
}

export function sumNumbers(arr) {
  return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}