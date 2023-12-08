// https://adventofcode.com/2023/day/7

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import fileParser from '../utils/file-parser.js';

const typeToValue = {
  fiveOfAKind: 6,
  fourOfAKind: 5,
  fullHouse: 4,
  threeOfAKind: 3,
  twoPair: 2,
  onePair: 1,
  highCard: 0,
};

const cardToValue = {
  A: 12,
  K: 11,
  Q: 10,
  J: 9,
  T: 8,
  9: 7,
  8: 6,
  7: 5,
  6: 4,
  5: 3,
  4: 2,
  3: 1,
  2: 0,
};

const cardToValueJoker = {
  A: 12,
  K: 11,
  Q: 10,
  J: -1,
  T: 8,
  9: 7,
  8: 6,
  7: 5,
  6: 4,
  5: 3,
  4: 2,
  3: 1,
  2: 0,
};

export function isFiveOfAKind(cardCounts) {
  for (const count of Object.values(cardCounts)) {
    if (count === 5) {
      return true;
    }
  }
  return false;
}

export function isFourOfAKind(cardCounts) {
  for (const count of Object.values(cardCounts)) {
    if (count === 4) {
      return true;
    }
  }
  return false;
}

export function isFullHouse(cardCounts) {
  let hasTwoOfAKind = false;
  let hasThreeOfAKind = false;
  for (const count of Object.values(cardCounts)) {
    if (count === 2) {
      hasTwoOfAKind = true;
    }
    if (count === 3) {
      hasThreeOfAKind = true;
    }
  }
  return hasTwoOfAKind && hasThreeOfAKind;
}

export function isThreeOfAKind(cardCounts) {
  let hasTwoOfAKind = false;
  let hasThreeOfAKind = false;
  for (const count of Object.values(cardCounts)) {
    if (count === 2) {
      hasTwoOfAKind = true;
    }
    if (count === 3) {
      hasThreeOfAKind = true;
    }
  }
  return !hasTwoOfAKind && hasThreeOfAKind;
}

export function isTwoPair(cardCounts) {
  let pairCount = 0;
  for (const count of Object.values(cardCounts)) {
    if (count === 2) {
      pairCount += 1;
    }
  }
  return pairCount === 2;
}

export function isOnePair(cardCounts) {
  let pairCount = 0;
  for (const count of Object.values(cardCounts)) {
    if (count === 2) {
      pairCount += 1;
    }
  }
  return pairCount === 1;
}

function determineHandType(cardCounts) {
  if (isFiveOfAKind(cardCounts)) { return 'fiveOfAKind'; }
  if (isFourOfAKind(cardCounts)) { return 'fourOfAKind'; }
  if (isFullHouse(cardCounts)) { return 'fullHouse'; }
  if (isThreeOfAKind(cardCounts)) { return 'threeOfAKind'; }
  if (isTwoPair(cardCounts)) { return 'twoPair'; }
  if (isOnePair(cardCounts)) { return 'onePair'; }
  return 'highCard';
}

/* eslint-disable no-param-reassign */
function determineCardCounts(cards) {
  const cardCounts = cards.reduce((obj, item) => {
    if (!obj[item]) {
      obj[item] = 0;
    }
    obj[item] += 1;
    return obj;
  }, {});
  return cardCounts;
}
/* eslint-enable no-param-reassign */

function lineParserP1(line) {
  const hand = line.split(' ')[0];
  const bid = parseInt(line.split(' ')[1], 10);
  const cards = hand.split('');
  const cardValues = cards.map((card) => cardToValue[card]);
  const cardCounts = determineCardCounts(cards);
  const type = determineHandType(cardCounts);
  const typeValue = typeToValue[type];

  return {
    hand,
    bid,
    cards,
    cardValues,
    rank: 0,
    type,
    cardCounts,
    typeValue,
  };
}

export function part1(filename) {
  const hands = fileParser(filename, lineParserP1);
  hands.sort((a, b) => a.typeValue - b.typeValue
    || a.cardValues[0] - b.cardValues[0]
    || a.cardValues[1] - b.cardValues[1]
    || a.cardValues[2] - b.cardValues[2]
    || a.cardValues[3] - b.cardValues[3]
    || a.cardValues[4] - b.cardValues[4]);

  let result = 0;
  for (let i = 0; i < hands.length; i += 1) {
    result += hands[i].bid * (i + 1);
  }

  return result;
}

function determineHandTypeJoker(cardCounts) {
  const jokers = cardCounts.J || 0;

  if (isFiveOfAKind(cardCounts)) { return 'fiveOfAKind'; }
  if (isFourOfAKind(cardCounts)) {
    if (jokers > 0) { return 'fiveOfAKind'; }
    return 'fourOfAKind';
  }
  if (isFullHouse(cardCounts)) {
    if (jokers > 0) { return 'fiveOfAKind'; }
    return 'fullHouse';
  }
  if (isThreeOfAKind(cardCounts)) {
    if (jokers === 1 || jokers === 3) { return 'fourOfAKind'; }
    return 'threeOfAKind';
  }
  if (isTwoPair(cardCounts)) {
    if (jokers === 2) { return 'fourOfAKind'; }
    if (jokers === 1) { return 'fullHouse'; }
    return 'twoPair';
  }
  if (isOnePair(cardCounts)) {
    if (jokers === 1 || jokers === 2) { return 'threeOfAKind'; }
    return 'onePair';
  }
  if (jokers === 1) { return 'onePair'; }
  return 'highCard';
}

function lineParserP2(line) {
  const hand = line.split(' ')[0];
  const bid = parseInt(line.split(' ')[1], 10);
  const cards = hand.split('');
  const cardValues = cards.map((card) => cardToValueJoker[card]);
  const cardCounts = determineCardCounts(cards);
  const type = determineHandTypeJoker(cardCounts);
  const typeValue = typeToValue[type];

  return {
    hand,
    bid,
    cards,
    cardValues,
    rank: 0,
    type,
    cardCounts,
    typeValue,
  };
}

export function part2(filename) {
  const hands = fileParser(filename, lineParserP2);
  hands.sort((a, b) => a.typeValue - b.typeValue
      || a.cardValues[0] - b.cardValues[0]
      || a.cardValues[1] - b.cardValues[1]
      || a.cardValues[2] - b.cardValues[2]
      || a.cardValues[3] - b.cardValues[3]
      || a.cardValues[4] - b.cardValues[4]);

  let result = 0;
  for (let i = 0; i < hands.length; i += 1) {
    result += hands[i].bid * (i + 1);
  }

  return result;
}

export function run() {
  const filename = './day-07/input.txt';
  const results = new Result('Day 07');

  let start = performance.now();
  results.part1.answer = part1(filename);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2(filename);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
}
