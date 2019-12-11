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

let memory = {
  
  _memory:  [],

  init(csvMemory) {
    _memory = csvMemory.split(",").map(number => {
      return parseInt(number);
    });
  },

  at(address) {
    return _memory[address];
  },

  set(address, value) {
    _memory[address] = value;
  }
};
exports.memory = memory;


let instruction = {};
exports.instruction = instruction;

function resetInstruction(newAddress) {
  
  instruction = { 
    address: newAddress,
    opcode: null,
    parameterOne: {mode: "", address: ""},
    parameterTwo: {mode: "", address: ""},
    parameterThree: {mode: "", address: ""},
    nextAddress: 0,
    process: null,
  };
};

function addInstruction(p1Address, p2Address, p3Address) {
  return function() {
    memory.set(p3Address, (memory.at(p1Address) + memory.at(p2Address)));
  };
}

function multiplyInstruction(p1Address, p2Address, p3Address) {
  return function() {
    memory.set(p3Address, (memory.at(p1Address) * memory.at(p2Address)));
  };
}

function inputInstruction(p1Address) {
  return function() {
    memory.set(memory.at(p1Address), input);
  };
}

// Returns a high order function so it can be invoked later
function outputInstruction(p1Address) {
  return function() {
    outputs.push(memory.at(p1Address));
  };
}

function jumpIfTrueInstruction(p1Address, p2Address) {
  return function() {
    instruction.nextAddress =
      (memory.at(p1Address) !== 0) ? memory.at(p2Address) : instruction.nextAddress;
  }
}

function jumpIfFalseInstruction(p1Address, p2Address) {
  return function() {
    instruction.nextAddress =
      (memory.at(p1Address) === 0) ? memory.at(p2Address) : instruction.nextAddress;
  }
}

function lessThanInstruction(p1Address, p2Address, p3Address) {
  return function() {
    memory.set(p3Address, (memory.at(p1Address) < memory.at(p2Address)) ? 1 : 0);
  };
}

function equalsInstruction(p1Address, p2Address, p3Address) {
  return function() {
    memory.set(p3Address, (memory.at(p1Address) === memory.at(p2Address)) ? 1 : 0);
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
  RELATIVE_BASE_OFFSET: 2,
  EQUALS: 4,
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


function getParameterAddress(mode, parameterAddress) {
  return (mode === IMMEDIATE) ? parameterAddress : memory.at(parameterAddress);
}

function decodeParameterOne(header) {
  instruction.parameterOne.mode = decodeParameterModeOne(header);
  instruction.parameterOne.address =
    getParameterAddress(instruction.parameterOne.mode, instruction.address+1);
}

function decodeParameterTwo(header) {
  instruction.parameterTwo.mode = decodeParameterModeTwo(header);
  instruction.parameterTwo.address =
    getParameterAddress(instruction.parameterTwo.mode, instruction.address+2);
}

function decodeParameterThree(header) {
  instruction.parameterThree.mode = decodeParameterModeThree(header);
  instruction.parameterThree.address =
    getParameterAddress(instruction.parameterThree.mode, instruction.address+3);
}

function finalizeInstruction(header) {

  let result = null;

  switch(instruction.opcode) {
    case ADD:
      decodeParameterOne(header);
      decodeParameterTwo(header);
      decodeParameterThree(header)
      result = addInstruction(instruction.parameterOne.address,
                              instruction.parameterTwo.address,
                              instruction.parameterThree.address);
      break;
    case MULTIPLY:
      decodeParameterOne(header);
      decodeParameterTwo(header);
      decodeParameterThree(header)
      result = multiplyInstruction(instruction.parameterOne.address,
                                   instruction.parameterTwo.address,
                                   instruction.parameterThree.address);
      break;
    case INPUT:
      result = inputInstruction(instruction.address+1);
      break;
    case OUTPUT:
      decodeParameterOne(header);
      result = outputInstruction(instruction.parameterOne.address);
      break;
    case JUMP_IF_TRUE:
      decodeParameterOne(header);
      decodeParameterTwo(header);
      result = jumpIfTrueInstruction(instruction.parameterOne.address,
                                     instruction.parameterTwo.address);
      break;
    case JUMP_IF_FALSE:
      decodeParameterOne(header);
      decodeParameterTwo(header);
      result = jumpIfFalseInstruction(instruction.parameterOne.address,
                                      instruction.parameterTwo.address);
      break;
    case LESS_THAN:
      decodeParameterOne(header);
      decodeParameterTwo(header);
      decodeParameterThree(header)
      result = lessThanInstruction(instruction.parameterOne.address,
                                   instruction.parameterTwo.address,
                                   instruction.parameterThree.address);
      break;
    case EQUALS:
      decodeParameterOne(header);
      decodeParameterTwo(header);
      decodeParameterThree(header)
      result = equalsInstruction(instruction.parameterOne.address,
                                 instruction.parameterTwo.address,
                                 instruction.parameterThree.address);
      break;
    case HALT:
      break;
    default:
      console.log(`Invalid opcode: ${instruction.opcode}`);
  }

  instruction.process = result;
}

decodeInstruction = function decodeInstruction() {
  const header = memory.at(instruction.address);
  instruction.opcode = decodeOpcode(header);
  instruction.nextAddress = instruction.address + addressIncrementLookup[instruction.opcode];
  finalizeInstruction(header);
}
exports.decodeInstruction = decodeInstruction;

exports.run = function run(_memory, _input) {
  outputs = [];
  input = _input;
  memory.init(_memory);
  resetInstruction(0);
  decodeInstruction();
  
  while(instruction.opcode !== "HALT") {
    //console.log(instruction)
    instruction.process();
    resetInstruction(instruction.nextAddress);
    decodeInstruction();
  }
  
  //console.log(`Intcode Output: ${outputs}`)
  return outputs.toString();
}