function defaultChunkParser(chunkFunction) {
  return chunkFunction;
}

export function chunk(arr, size, parser = defaultChunkParser) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    const chunkFunction = arr.slice(i, i + size);
    result.push(parser(chunkFunction));
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

/**
 * This function takes an array of strings and counts the instances of each string.
 *
 * @param {Array} arr An Array of string values
 * @returns An object using the array strings as keys and the number of occurrences as values.
 */
export function sumInstances(arr) {
  const result = arr.reduce((accu, item) => {
    if (!accu[item]) {
      accu[item] = 0;
    }
    accu[item] += 1;
    return accu;
  }, {});
  return result;
}
