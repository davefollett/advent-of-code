const intcode = require("./intcode.js");

test('decodeOpcode(ADD)', () => {
  const expected = intcode.opcodeLookup[1];

  expect(intcode.decodeOpcode(401)).toBe(expected);
  expect(intcode.decodeOpcode(1501)).toBe(expected);
  expect(intcode.decodeOpcode(2501)).toBe(expected);
  expect(intcode.decodeOpcode(90701)).toBe(expected);
  expect(intcode.decodeOpcode(1)).toBe(expected);
  expect(intcode.decodeOpcode(9)).toBe(undefined);
});

test('decodeOpcode(MULTIPLY)', () => {
  const expected = intcode.opcodeLookup[2];

  expect(intcode.decodeOpcode(102)).toBe(expected);
  expect(intcode.decodeOpcode(1102)).toBe(expected);
  expect(intcode.decodeOpcode(12302)).toBe(expected);
  expect(intcode.decodeOpcode(98702)).toBe(expected);
  expect(intcode.decodeOpcode(2)).toBe(expected);
  expect(intcode.decodeOpcode(8)).toBe(undefined);
});

test('decodeOpcode(INPUT)', () => {
  const expected = intcode.opcodeLookup[3];

  expect(intcode.decodeOpcode(303)).toBe(expected);
  expect(intcode.decodeOpcode(1403)).toBe(expected);
  expect(intcode.decodeOpcode(1503)).toBe(expected);
  expect(intcode.decodeOpcode(23703)).toBe(expected);
  expect(intcode.decodeOpcode(3)).toBe(expected);
  expect(intcode.decodeOpcode(9)).toBe(undefined);
});

test('decodeOpcode(OUTPUT)', () => {
  const expected = intcode.opcodeLookup[4];

  expect(intcode.decodeOpcode(304)).toBe(expected);
  expect(intcode.decodeOpcode(1404)).toBe(expected);
  expect(intcode.decodeOpcode(1504)).toBe(expected);
  expect(intcode.decodeOpcode(23704)).toBe(expected);
  expect(intcode.decodeOpcode(4)).toBe(expected);
  expect(intcode.decodeOpcode(5)).toBe(undefined);
});

test('decodeOpcode(HALT)', () => {
  const expected = intcode.opcodeLookup[99];

  expect(intcode.decodeOpcode(399)).toBe(expected);
  expect(intcode.decodeOpcode(1299)).toBe(expected);
  expect(intcode.decodeOpcode(2599)).toBe(expected);
  expect(intcode.decodeOpcode(90799)).toBe(expected);
  expect(intcode.decodeOpcode(99)).toBe(expected);
  expect(intcode.decodeOpcode(9)).toBe(undefined);
});


const positionMode = intcode.parameterModeLookup[0];
const immediateMode = intcode.parameterModeLookup[1];

test.each`
  header    | expectedParam3   | expectedParam2   | expectedParam1
  ${100003} | ${positionMode}  | ${positionMode}  | ${positionMode}
  ${100000} | ${positionMode}  | ${positionMode}  | ${positionMode}
  ${111145} | ${immediateMode} | ${immediateMode} | ${immediateMode}
  ${10100}  | ${immediateMode} | ${positionMode}  | ${immediateMode}
  ${110100} | ${immediateMode} | ${positionMode}  | ${immediateMode}
  ${101100} | ${positionMode}  | ${immediateMode} | ${immediateMode}
  ${199911} | ${undefined}     | ${undefined}     | ${undefined}
`('decodeParameterModes()', ({header, expectedParam3, expectedParam2, expectedParam1}) => {

  const {param1, param2, param3} = intcode.decodeParameterModes(header);
  expect(param1.mode).toBe(expectedParam1);
  expect(param2.mode).toBe(expectedParam2);
  expect(param3.mode).toBe(expectedParam3);
});


test('run(REAL)', () => {
  intcode.run("./day-05/input.txt");

});
