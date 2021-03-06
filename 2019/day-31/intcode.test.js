const readline = require("readline");
const fs = require("fs");
const intcode = require("./intcode.js");

test.each`
  header   | expectedOpcode
  ${401}   | ${intcode.ADD}
  ${1501}  | ${intcode.ADD}
  ${2501}  | ${intcode.ADD}
  ${90701} | ${intcode.ADD}
  ${1}     | ${intcode.ADD}
  ${19}    | ${undefined}

  ${102}   | ${intcode.MULTIPLY}
  ${1102}  | ${intcode.MULTIPLY}
  ${12302} | ${intcode.MULTIPLY}
  ${98702} | ${intcode.MULTIPLY}
  ${2}     | ${intcode.MULTIPLY}
  ${1218}  | ${undefined}

  ${303}   | ${intcode.INPUT}
  ${1403}  | ${intcode.INPUT}
  ${1503}  | ${intcode.INPUT}
  ${23703} | ${intcode.INPUT}
  ${3}     | ${intcode.INPUT}
  ${2222}  | ${undefined}

  ${304}   | ${intcode.OUTPUT}
  ${1404}  | ${intcode.OUTPUT}
  ${1504}  | ${intcode.OUTPUT}
  ${23704} | ${intcode.OUTPUT}
  ${4}     | ${intcode.OUTPUT}
  ${1255}  | ${undefined}

  ${705}   | ${intcode.JUMP_IF_TRUE}
  ${505}   | ${intcode.JUMP_IF_TRUE}
  ${6605}  | ${intcode.JUMP_IF_TRUE}
  ${34005} | ${intcode.JUMP_IF_TRUE}
  ${5}     | ${intcode.JUMP_IF_TRUE}
  ${1295}  | ${undefined}

  ${206}   | ${intcode.JUMP_IF_FALSE}
  ${106}   | ${intcode.JUMP_IF_FALSE}
  ${3606}  | ${intcode.JUMP_IF_FALSE}
  ${12006} | ${intcode.JUMP_IF_FALSE}
  ${6}     | ${intcode.JUMP_IF_FALSE}
  ${1255}  | ${undefined}

  ${907}   | ${intcode.LESS_THAN}
  ${607}   | ${intcode.LESS_THAN}
  ${5607}  | ${intcode.LESS_THAN}
  ${77707} | ${intcode.LESS_THAN}
  ${7}     | ${intcode.LESS_THAN}
  ${1255}  | ${undefined}

  ${108}   | ${intcode.EQUALS}
  ${808}   | ${intcode.EQUALS}
  ${1108}  | ${intcode.EQUALS}
  ${10108} | ${intcode.EQUALS}
  ${8}     | ${intcode.EQUALS}
  ${1234}  | ${undefined}

  ${399}   | ${intcode.HALT}
  ${1299}  | ${intcode.HALT}
  ${2599}  | ${intcode.HALT}
  ${90799} | ${intcode.HALT}
  ${99}    | ${intcode.HALT}
  ${1455}  | ${undefined}
`('decodeOpcode()', ({header, expectedOpcode}) => {

  expect(intcode.decodeOpcode(header)).toBe(expectedOpcode);
});

test.each`
  header    | expected
  ${100003} | ${intcode.POSITION}
  ${100000} | ${intcode.POSITION}
  ${111145} | ${intcode.IMMEDIATE}
  ${10100}  | ${intcode.IMMEDIATE}
  ${110100} | ${intcode.IMMEDIATE}
  ${101100} | ${intcode.IMMEDIATE}
  ${199911} | ${undefined}
`('decodeParameterModeOne()', ({header, expected}) => {
  expect(intcode.decodeParameterModeOne(header)).toBe(expected);
});

test.each`
  header    | expected
  ${100003} | ${intcode.POSITION}
  ${100000} | ${intcode.POSITION}
  ${111145} | ${intcode.IMMEDIATE}
  ${10100}  | ${intcode.POSITION}
  ${110100} | ${intcode.POSITION}
  ${101100} | ${intcode.IMMEDIATE}
  ${199911} | ${undefined}
`('decodeParameterModeTwo()', ({header, expected}) => {
  expect(intcode.decodeParameterModeTwo(header)).toBe(expected);
});

test.each`
  header    | expected
  ${100003} | ${intcode.POSITION}
  ${100000} | ${intcode.POSITION}
  ${111145} | ${intcode.IMMEDIATE}
  ${10100}  | ${intcode.IMMEDIATE}
  ${110100} | ${intcode.IMMEDIATE}
  ${101100} | ${intcode.POSITION}
  ${3}      | ${intcode.POSITION}
`('decodeParameterModeThree()', ({header, expected}) => {
  expect(intcode.decodeParameterModeThree(header)).toBe(expected);
});

test('Memory At', () => {
  let _memory = "0,1,2,3,4,5,6,7,8,16225258]";
  intcode.memory.init(_memory);
  expect(intcode.memory.at(1)).toBe(1);
  expect(intcode.memory.at(9)).toBe(16225258);
  expect(intcode.memory.at(200)).toBe(undefined);
});

test('Memory Set', () => {
  let _memory = "0,1,2,3,4,5,6,7,8,16225258]";
  intcode.memory.init(_memory);
  intcode.memory.set(1,12);
  intcode.memory.set(0,-1);
  expect(intcode.memory.at(1)).toBe(12);
  expect(intcode.memory.at(0)).toBe(-1);
});

test('Part 1 run(REAL)', () => {
  let _memory = fs.readFileSync("./day-05/input.txt", 'utf-8');
  const expected = [0,0,0,0,0,0,0,0,0,16225258].toString();
  expect(intcode.run(_memory, 1)).toBe(expected);
});

test('Part 2 run(REAL)', () => {
  let _memory = fs.readFileSync("./day-05/input.txt", 'utf-8');
  const expected = "2808771";
  expect(intcode.run(_memory, 5)).toBe(expected);
});

