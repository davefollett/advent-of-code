const readline = require("readline");
const fs = require("fs");
const intcode = require("./intcode.js");

// test.each`
//   header   | expectedOpcode
//   ${401}   | ${intcode.ADD}
//   ${1501}  | ${intcode.ADD}
//   ${2501}  | ${intcode.ADD}
//   ${90701} | ${intcode.ADD}
//   ${1}     | ${intcode.ADD}
//   ${19}    | ${undefined}

//   ${102}   | ${intcode.MULTIPLY}
//   ${1102}  | ${intcode.MULTIPLY}
//   ${12302} | ${intcode.MULTIPLY}
//   ${98702} | ${intcode.MULTIPLY}
//   ${2}     | ${intcode.MULTIPLY}
//   ${1218}  | ${undefined}

//   ${303}   | ${intcode.INPUT}
//   ${1403}  | ${intcode.INPUT}
//   ${1503}  | ${intcode.INPUT}
//   ${23703} | ${intcode.INPUT}
//   ${3}     | ${intcode.INPUT}
//   ${2222}  | ${undefined}

//   ${304}   | ${intcode.OUTPUT}
//   ${1404}  | ${intcode.OUTPUT}
//   ${1504}  | ${intcode.OUTPUT}
//   ${23704} | ${intcode.OUTPUT}
//   ${4}     | ${intcode.OUTPUT}
//   ${1255}  | ${undefined}

//   ${705}   | ${intcode.JUMP_IF_TRUE}
//   ${505}   | ${intcode.JUMP_IF_TRUE}
//   ${6605}  | ${intcode.JUMP_IF_TRUE}
//   ${34005} | ${intcode.JUMP_IF_TRUE}
//   ${5}     | ${intcode.JUMP_IF_TRUE}
//   ${1295}  | ${undefined}

//   ${206}   | ${intcode.JUMP_IF_FALSE}
//   ${106}   | ${intcode.JUMP_IF_FALSE}
//   ${3606}  | ${intcode.JUMP_IF_FALSE}
//   ${12006} | ${intcode.JUMP_IF_FALSE}
//   ${6}     | ${intcode.JUMP_IF_FALSE}
//   ${1255}  | ${undefined}

//   ${907}   | ${intcode.LESS_THAN}
//   ${607}   | ${intcode.LESS_THAN}
//   ${5607}  | ${intcode.LESS_THAN}
//   ${77707} | ${intcode.LESS_THAN}
//   ${7}     | ${intcode.LESS_THAN}
//   ${1255}  | ${undefined}

//   ${108}   | ${intcode.EQUALS}
//   ${808}   | ${intcode.EQUALS}
//   ${1108}  | ${intcode.EQUALS}
//   ${10108} | ${intcode.EQUALS}
//   ${8}     | ${intcode.EQUALS}
//   ${1234}  | ${undefined}

//   ${109}   | ${intcode.RELATIVE_BASE_OFFSET}
//   ${809}   | ${intcode.RELATIVE_BASE_OFFSET}
//   ${1109}  | ${intcode.RELATIVE_BASE_OFFSET}
//   ${10109} | ${intcode.RELATIVE_BASE_OFFSET}
//   ${9}     | ${intcode.RELATIVE_BASE_OFFSET}
//   ${1234}  | ${undefined}

//   ${399}   | ${intcode.HALT}
//   ${1299}  | ${intcode.HALT}
//   ${2599}  | ${intcode.HALT}
//   ${90799} | ${intcode.HALT}
//   ${99}    | ${intcode.HALT}
//   ${1455}  | ${undefined}
// `('decodeOpcode()', ({header, expectedOpcode}) => {

//   expect(intcode.decodeOpcode(header)).toBe(expectedOpcode);
// });

// test.each`
//   header    | expected
//   ${100003} | ${intcode.POSITION}
//   ${100000} | ${intcode.POSITION}
//   ${111145} | ${intcode.IMMEDIATE}
//   ${10100}  | ${intcode.IMMEDIATE}
//   ${110100} | ${intcode.IMMEDIATE}
//   ${101100} | ${intcode.IMMEDIATE}
//   ${101200} | ${intcode.RELATIVE}
//   ${102200} | ${intcode.RELATIVE}
//   ${122200} | ${intcode.RELATIVE}
//   ${199911} | ${undefined}
// `('decodeParameterModeOne()', ({header, expected}) => {
//   expect(intcode.decodeParameterModeOne(header)).toBe(expected);
// });

// test.each`
//   header    | expected
//   ${100003} | ${intcode.POSITION}
//   ${100000} | ${intcode.POSITION}
//   ${111145} | ${intcode.IMMEDIATE}
//   ${10100}  | ${intcode.POSITION}
//   ${110100} | ${intcode.POSITION}
//   ${101100} | ${intcode.IMMEDIATE}
//   ${102100} | ${intcode.RELATIVE}
//   ${102000} | ${intcode.RELATIVE}
//   ${122200} | ${intcode.RELATIVE}
//   ${199911} | ${undefined}
// `('decodeParameterModeTwo()', ({header, expected}) => {
//   expect(intcode.decodeParameterModeTwo(header)).toBe(expected);
// });

// test.each`
//   header    | expected
//   ${100003} | ${intcode.POSITION}
//   ${100000} | ${intcode.POSITION}
//   ${111145} | ${intcode.IMMEDIATE}
//   ${10100}  | ${intcode.IMMEDIATE}
//   ${110100} | ${intcode.IMMEDIATE}
//   ${101100} | ${intcode.POSITION}
//   ${122000} | ${intcode.RELATIVE}
//   ${120000} | ${intcode.RELATIVE}
//   ${122200} | ${intcode.RELATIVE}
// `('decodeParameterModeThree()', ({header, expected}) => {
//   expect(intcode.decodeParameterModeThree(header)).toBe(expected);
// });

// test('Part 1 run(TEST 1)', () => {
//   let _memory = "109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99";
//   for(let i = 0; i<1000; i++) {
//     _memory += ",0";
//   }
//   //console.log(_memory)
//   //intcode.run(_memory, 1);

//   // const expected = [0,0,0,0,0,0,0,0,0,16225258].toString();
//   expect(intcode.run(_memory, 1)).toBe("109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99");
// });


// test('Part 1 run(TEST 2)', () => {
//   let _memory = "104,1125899906842624,99"
  
//   //expect(intcode.run(_memory, 1)).toBe("1125899906842624");
// });

// test('Part 1 run(TEST 3)', () => {
//   let _memory = "1102,34915192,34915192,7,4,7,99,0";
//   //expect(intcode.run(_memory, 1)).toBe("1219070632396864");
// });

// test('Part 1 run(RELATIVE INPUT)', () => {
//   let _memory = "109,1,203,0,4,1,99";

//   intcode.run(_memory, 5);

// });

test('Part 1 run(REAL)', () => {

  let _memory = fs.readFileSync("./day-09/input.txt", 'utf-8');
  for(let i = 0; i<100000; i++) {
        _memory += ",0";
      }
      //console.log(_memory)
  intcode.run(_memory, 1);
  //const expected = [0,0,0,0,0,0,0,0,0,16225258].toString();
  //expect(intcode.run(_memory, 1)).toBe(expected);
});

// test('Part 2 run(REAL)', () => {

//   let _memory = fs.readFileSync("./day-09/input.txt", 'utf-8');
//   const expected = "2808771";
//   expect(intcode.run(_memory, 5)).toBe(expected);
// });

