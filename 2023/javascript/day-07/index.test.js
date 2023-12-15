/* eslint-disable object-curly-newline */
import { describe, expect, test } from 'vitest';
import {
  part1,
  part2,
  isFiveOfAKind,
  isFourOfAKind,
  isFullHouse,
  isThreeOfAKind,
} from './index.js';

const inputFilename = './day-07/input.txt';
const testInputFilename = './day-07/test-input.txt';

describe('@/day-07/index.js', () => {
  describe('isFiveOfAKind()', () => {
    test.each`
      cardCounts    | expected
      ${{ 2: 1, 3: 2, T: 1, K: 1 }} | ${false}
      ${{ 2: 0, 3: 5, T: 0, K: 0 }} | ${true}
      ${{ 2: 0, 3: 0, T: 0, K: 5 }} | ${true}
    `('isFiveOfAKind()', ({ cardCounts, expected }) => {
      expect(isFiveOfAKind(cardCounts)).toBe(expected);
    });
  });

  describe('isFourOfAKind()', () => {
    test.each`
      cardCounts    | expected
      ${{ 2: 1, 3: 2, T: 1, K: 1 }} | ${false}
      ${{ 2: 0, 3: 4, T: 0, K: 0 }} | ${true}
      ${{ 2: 1, 3: 0, T: 0, K: 4 }} | ${true}
    `('isFourOfAKind()', ({ cardCounts, expected }) => {
      expect(isFourOfAKind(cardCounts)).toBe(expected);
    });
  });

  describe('isFullHouse()', () => {
    test.each`
      cardCounts    | expected
      ${{ 2: 1, 3: 2, T: 1, K: 1 }} | ${false}
      ${{ 2: 0, 3: 3, T: 0, K: 2 }} | ${true}
      ${{ 2: 2, 3: 0, T: 3, K: 0 }} | ${true}
    `('isFullHouse()', ({ cardCounts, expected }) => {
      expect(isFullHouse(cardCounts)).toBe(expected);
    });
  });

  describe('isThreeOfAKind()', () => {
    test.each`
      cardCounts    | expected
      ${{ 2: 1, 3: 2, T: 1, K: 1 }} | ${false}
      ${{ 2: 0, 3: 2, T: 0, K: 3 }} | ${false}
      ${{ 2: 0, 3: 3, T: 0, K: 0 }} | ${true}
      ${{ 2: 0, 3: 0, T: 3, K: 0 }} | ${true}
    `('isThreeOfAKind()', ({ cardCounts, expected }) => {
      expect(isThreeOfAKind(cardCounts)).toBe(expected);
    });
  });

  describe('part1()', () => {
    test('part1 should pass', () => {
      const answer = part1(inputFilename);
      expect(answer).toBe(253866470);
    });

    test('part1 should pass test input', () => {
      const answer = part1(testInputFilename);
      expect(answer).toBe(6440);
    });
  });

  describe('part2()', () => {
    test('part2 should pass', () => {
      const answer = part2(inputFilename);
      expect(answer).toBe(254494947);
    });

    test('part2 should pass test input', () => {
      const answer = part2(testInputFilename);
      expect(answer).toBe(5905);
    });
  });
});
/* eslint-enable object-curly-newline */
