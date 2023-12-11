/**
 * greatest common divisor.
 * - Source: https://stackoverflow.com/a/49722579
 */
export function gcd(a, b) {
  return a ? gcd(b % a, a) : b;
}

/**
 * Least common multiple.
 * - Source: https://stackoverflow.com/a/49722579
 */
export function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

/**
 * Least common multiple of an array of numbers.
 * - Source: https://stackoverflow.com/a/49722579
 */
export function lcmOfArray(arr) {
  return arr.reduce(lcm);
}
