const readline = require("readline");
const fs = require("fs");

const input = 1;

const outputs = [];

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
    addressIncrement: 0,
    process: null,
  };
};

function initMemory(filename) {
  memory = fs.readFileSync(filename, 'utf-8').split(',');
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
    memory[memory[address+1]] = input;
  };
}

// Returns a high order function so it can be invoked later
function outputInstruction(address) {
  return function() {
    outputs.push(memory[address]);
  };
}

function haltInstruction(parameterOne, parameterTwo, storageAddress) {

}

const opcodeLookup = { 1: "ADD", 2: "MULTIPLY", 3: "INPUT", 4: "OUTPUT", 99: "HALT" };
exports.opcodeLookup = opcodeLookup;

const parameterModeLookup = { 0: "POSITION", 1: "IMMEDIATE" };
exports.parameterModeLookup = parameterModeLookup;

const addressIncrementLookup = { "ADD": 4, "MULTIPLY": 4, "INPUT": 2, "OUTPUT": 2, "HALT": 99 };

function decodeOpcode(instructionHeader) {
  return opcodeLookup[parseInt(instructionHeader % 100)];
}
exports.decodeOpcode = decodeOpcode;

function decodeParameterModes(header) {

  param1 = {};
  param1.mode = parameterModeLookup[parseInt(header % 1000 / 100)];
  param1.value = "";

  param2 = {};
  param2.mode = parameterModeLookup[parseInt(header % 10000 / 1000)];
  param2.value = "";

  param3 = {};
  param3.mode = parameterModeLookup[parseInt(header % 100000 / 10000)];
  param3.value = "";

  return {param1, param2, param3};
}
exports.decodeParameterModes = decodeParameterModes;


function finalizeInstruction() {

  let result = null;

  switch(instruction.opcode) {
    case "ADD":
      instruction.parameterOne.value = (instruction.parameterOne.mode === "IMMEDIATE") ? parseInt(memory[instruction.address+1]) : parseInt(memory[memory[instruction.address+1]]);
      instruction.parameterTwo.value = (instruction.parameterTwo.mode === "IMMEDIATE") ? parseInt(memory[instruction.address+2]) : parseInt(memory[memory[instruction.address+2]]);
      instruction.parameterThree.value = parseInt(memory[instruction.address+3]);
      result = addInstruction(instruction.parameterOne.value, instruction.parameterTwo.value, instruction.parameterThree.value);
      break;
    case "MULTIPLY":
      instruction.parameterOne.value = (instruction.parameterOne.mode === "IMMEDIATE") ? parseInt(memory[instruction.address+1]) : parseInt(memory[memory[instruction.address+1]]);
      instruction.parameterTwo.value = (instruction.parameterTwo.mode === "IMMEDIATE") ? parseInt(memory[instruction.address+2]) : parseInt(memory[memory[instruction.address+2]]);
      instruction.parameterThree.value = parseInt(memory[instruction.address+3]);
      result = multiplyInstruction(instruction.parameterOne.value, instruction.parameterTwo.value, instruction.parameterThree.value);
      break;
    case "INPUT":
      result = inputInstruction(instruction.address);
      break;
    case "OUTPUT":
      result = outputInstruction(instruction.address);
      break;
    case"HALT":
      break;
    default:
      console.log(`Invalid opcode: ${instruction.opcode}`);
  }

  instruction.process = result;
}

decodeInstruction = function decodeInstruction() {
  const header = memory[instruction.address];
  console.log(`header: ${header}`);
  instruction.opcode = decodeOpcode(header);
  instruction.nextAddress = instruction.address + addressIncrementLookup[instruction.opcode];
  const {param1, param2, param3} = decodeParameterModes(header);
  instruction.parameterOne = param1;
  instruction.parameterTwo = param2;
  instruction.parameterThree = param3;
  finalizeInstruction();
}
exports.decodeInstruction = decodeInstruction;





exports.run = function run(filename) {
  
  initMemory(filename);
  resetInstruction(0);

  decodeInstruction();
  //console.log(instruction)
  while(instruction.opcode !== "HALT") {
    console.log(instruction)
    instruction.process();
    resetInstruction(instruction.nextAddress);
    decodeInstruction();
  }
  
  console.log(`Intcode Output: ${outputs}`)
}