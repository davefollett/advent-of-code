const readline = require("readline");
const fs = require("fs");

// OPCODES //
const ADD = "ADD";
exports.ADD = ADD;

const MULTIPLY = "MULTIPLY";
exports.MULTIPLY = MULTIPLY;

const INPUT = "INPUT";
exports.INPUT = INPUT;

const OUTPUT = "OUTPUT";
exports.OUTPUT = OUTPUT;

const JUMP_IF_TRUE = "JUMP_IF_TRUE";
exports.JUMP_IF_TRUE = JUMP_IF_TRUE;

const JUMP_IF_FALSE = "JUMP_IF_FALSE";
exports.JUMP_IF_FALSE = JUMP_IF_FALSE;

const LESS_THAN = "LESS_THAN";
exports.LESS_THAN = LESS_THAN;

const EQUALS = "EQUALS";
exports.EQUALS = EQUALS;

const RELATIVE_BASE_OFFSET = "RELATIVE_BASE_OFFSET";
exports.RELATIVE_BASE_OFFSET = RELATIVE_BASE_OFFSET;

const HALT = "HALT";
exports.HALT = HALT;

// PARAMETER MODES //
const POSITION = "POSITION";
exports.POSITION = POSITION;

const IMMEDIATE = "IMMEDIATE";
exports.IMMEDIATE = IMMEDIATE;

const RELATIVE = "RELATIVE";
exports.RELATIVE = RELATIVE;

let input = -1;
let outputs = [];
let relativeBase = 0;

let memory = [];
exports.memory = memory;

let instruction = {};
exports.instruction = instruction;

const nullParameter = {mode: "", value: ""};

function resetInstruction(newAddress) {
  
  instruction = { 
    address: newAddress,
    opcode: null,
    parameterOne: {mode: "", value: ""},
    parameterTwo: {mode: "", value: ""},
    parameterThree: {mode: "", value: ""},
    nextAddress: 0,
    process: null,
  };
};

function initMemory(_memory) {
  memory = _memory.split(',');
}

function addInstruction(parameterOne, parameterTwo, address) {
  return function() {
    memory[address] = parameterOne + parameterTwo;
  };
}

function multiplyInstruction(parameterOne, parameterTwo, address) {
  return function() {
    memory[address] = parameterOne * parameterTwo;
  };
}

function inputInstruction(address) {
  return function() {
    memory[address] = input;
    //memory[memory[address]] = input;
  };
}

// Returns a high order function so it can be invoked later
function outputInstruction(parameterOne) {
  return function() {
    outputs.push(parameterOne);
  };
}

function jumpIfTrueInstruction(parameterOne, parameterTwo) {
  return function() {
    instruction.nextAddress = (parameterOne !== 0) ? parameterTwo : instruction.nextAddress;
  }
}

function jumpIfFalseInstruction(parameterOne, parameterTwo) {
  return function() {
    instruction.nextAddress = (parameterOne === 0) ? parameterTwo : instruction.nextAddress;
  }
}

function lessThanInstruction(parameterOne, parameterTwo, address) {
  return function() {
    memory[address] = (parameterOne < parameterTwo) ? 1 : 0;
  };
}

function equalsInstruction(parameterOne, parameterTwo, address) {
  return function() {
    memory[address] = (parameterOne === parameterTwo) ? 1 : 0;
  };
}

function relativeBaseOffsetInstruction(parameterOne) {
  return function() {
    relativeBase += parameterOne;
  };
}


const opcodeLookup = {
  1: ADD,
  2: MULTIPLY,
  3: INPUT,
  4: OUTPUT,
  5: JUMP_IF_TRUE,
  6: JUMP_IF_FALSE,
  7: LESS_THAN,
  8: EQUALS,
  9: RELATIVE_BASE_OFFSET,
  99: HALT,
};
exports.opcodeLookup = opcodeLookup;

const parameterModeLookup = {
  0: POSITION,
  1: IMMEDIATE,
  2: RELATIVE,
};
exports.parameterModeLookup = parameterModeLookup;

const addressIncrementLookup = {
  ADD: 4,
  MULTIPLY: 4,
  INPUT: 2,
  OUTPUT: 2,
  JUMP_IF_TRUE: 3,
  JUMP_IF_FALSE: 3,
  LESS_THAN: 4,
  EQUALS: 4,
  RELATIVE_BASE_OFFSET: 2,
 };

function decodeOpcode(header) {
  return opcodeLookup[parseInt(header % 100)];
}
exports.decodeOpcode = decodeOpcode;

function decodeParameterModeOne(header) {
  return parameterModeLookup[parseInt(header % 1000 / 100)];
}
exports.decodeParameterModeOne = decodeParameterModeOne;

function decodeParameterModeTwo(header) {
  return parameterModeLookup[parseInt(header % 10000 / 1000)];
}
exports.decodeParameterModeTwo = decodeParameterModeTwo;

function decodeParameterModeThree(header) {
  return parameterModeLookup[parseInt(header % 100000 / 10000)];
}
exports.decodeParameterModeThree = decodeParameterModeThree;


function getParameterValue(mode, address) {
  switch(mode) {
    case IMMEDIATE:
      return parseInt(memory[address]);
    case POSITION:
      return parseInt(memory[memory[address]]);
    case RELATIVE:
      // console.log(`address: ${address}`)
      // console.log(`memory[address]: ${memory[address]}`)
      // console.log(`memory[memory[address]]: ${memory[memory[address]]}`);
      // console.log(`relativeBase ${relativeBase}`)
      return memory[parseInt(memory[address]) + relativeBase];
  }
  //return (mode === IMMEDIATE) ? parseInt(memory[address]) : parseInt(memory[memory[address]]);
}

function decodeParameterOne(header) {
  instruction.parameterOne.mode = decodeParameterModeOne(header);
  instruction.parameterOne.value = getParameterValue(instruction.parameterOne.mode, instruction.address+1);
}

function decodeParameterTwo(header) {
  instruction.parameterTwo.mode = decodeParameterModeTwo(header);
  instruction.parameterTwo.value = getParameterValue(instruction.parameterTwo.mode, instruction.address+2);
}

function decodeParameterThree(header) {
  instruction.parameterThree.mode = decodeParameterModeThree(header);
  instruction.parameterThree.value = parseInt(memory[instruction.address+3]);
}

function finalizeInstruction(header) {

  let result = null;

  switch(instruction.opcode) {
    case ADD:
      decodeParameterOne(header);
      decodeParameterTwo(header);
      decodeParameterThree(header)
      result = addInstruction(instruction.parameterOne.value,
                              instruction.parameterTwo.value,
                              instruction.parameterThree.value);
      break;
    case MULTIPLY:
      decodeParameterOne(header);
      decodeParameterTwo(header);
      decodeParameterThree(header)
      result = multiplyInstruction(instruction.parameterOne.value,
                                   instruction.parameterTwo.value,
                                   instruction.parameterThree.value);
      break;
    case INPUT:
      console.log(`relativeBase: ${relativeBase}`)
      console.log(`mem 26: ${memory[26]}`)
      //decodeParameterOne(header);
      //result = inputInstruction(instruction.parameterOne.value);
      result = inputInstruction(parseInt(memory[instruction.address+1]) + relativeBase);
      //result = inputInstruction(instruction.address+1);
      break;
    case OUTPUT:
      decodeParameterOne(header);
      result = outputInstruction(instruction.parameterOne.value);
      break;
    case JUMP_IF_TRUE:
      decodeParameterOne(header);
      decodeParameterTwo(header);
      result = jumpIfTrueInstruction(instruction.parameterOne.value,
                                     instruction.parameterTwo.value);
      break;
    case JUMP_IF_FALSE:
      decodeParameterOne(header);
      decodeParameterTwo(header);
      result = jumpIfFalseInstruction(instruction.parameterOne.value,
                                      instruction.parameterTwo.value);
      break;
    case LESS_THAN:
      decodeParameterOne(header);
      decodeParameterTwo(header);
      decodeParameterThree(header)
      result = lessThanInstruction(instruction.parameterOne.value,
                                   instruction.parameterTwo.value,
                                   instruction.parameterThree.value);
      break;
    case EQUALS:
      decodeParameterOne(header);
      decodeParameterTwo(header);
      decodeParameterThree(header)
      result = equalsInstruction(instruction.parameterOne.value,
                                 instruction.parameterTwo.value,
                                 instruction.parameterThree.value);
      break;
    case RELATIVE_BASE_OFFSET:
      decodeParameterOne(header);
      //console.log(instruction)
      result = relativeBaseOffsetInstruction(instruction.parameterOne.value);
      //result = relativeBaseOffsetInstruction(memory[instruction.address+1]);
      break;
    case HALT:
      break;
    default:
      console.log(`Invalid opcode: ${instruction.opcode}`);
  }

  instruction.process = result;
}

decodeInstruction = function decodeInstruction() {
  const header = memory[instruction.address];
  instruction.opcode = decodeOpcode(header);
  instruction.nextAddress = instruction.address + addressIncrementLookup[instruction.opcode];
  finalizeInstruction(header);
}
exports.decodeInstruction = decodeInstruction;

exports.run = function run(_memory, _input) {
  outputs = [];
  input = _input;
  initMemory(_memory);
  resetInstruction(0);
  decodeInstruction();
  //console.log(instruction)
  let index = 0;
  while(instruction.opcode !== "HALT") {

  //while(index < 2) {
    console.log(instruction)
    instruction.process();
    resetInstruction(instruction.nextAddress);
    decodeInstruction();
    index += 1;
    //console.log(instruction)
  }
  

  console.log(`index: ${index}`)
  console.log(`Intcode Output: ${outputs}`)
  return outputs.toString();
}