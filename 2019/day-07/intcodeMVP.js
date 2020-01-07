// OPCODES //
const ADD = 'ADD'
const MULTIPLY = 'MULTIPLY'
const INPUT = 'INPUT'
const OUTPUT = 'OUTPUT'
const JUMP_IF_TRUE = 'JUMP_IF_TRUE'
const JUMP_IF_FALSE = 'JUMP_IF_FALSE'
const LESS_THAN = 'LESS_THAN'
const EQUALS = 'EQUALS'
const HALT = 'HALT'

// PARAMETER MODES //
const POSITION = 'POSITION'
const IMMEDIATE = 'IMMEDIATE'

const opcodeLookup = {
  1: ADD,
  2: MULTIPLY,
  3: INPUT,
  4: OUTPUT,
  5: JUMP_IF_TRUE,
  6: JUMP_IF_FALSE,
  7: LESS_THAN,
  8: EQUALS,
  99: HALT
}

const parameterModeLookup = {
  0: POSITION,
  1: IMMEDIATE
}

const addressIncrementLookup = {
  ADD: 4,
  MULTIPLY: 4,
  INPUT: 2,
  OUTPUT: 2,
  JUMP_IF_TRUE: 3,
  JUMP_IF_FALSE: 3,
  LESS_THAN: 4,
  EQUALS: 4
}

function decodeOpcode(header) {
  return opcodeLookup[parseInt(header % 100)]
}

function decodeParameterModeOne(header) {
  return parameterModeLookup[
    parseInt((header % 1000) / 100)
  ]
}

function decodeParameterModeTwo(header) {
  return parameterModeLookup[
    parseInt((header % 10000) / 1000)
  ]
}

function decodeParameterModeThree(header) {
  return parameterModeLookup[
    parseInt((header % 100000) / 10000)
  ]
}

function makeIntcode() {
  let inputs = []
  let outputs = []
  let _memory = []
  let instruction = {}

  let memory = {
    init(csvMemory) {
      _memory = csvMemory.split(',').map(number => {
        return parseInt(number)
      })
    },

    at(address) {
      return _memory[address]
    },

    set(address, value) {
      _memory[address] = value
    },

    getMemory() {
      return _memory
    },

    log() {
      process.stdout.write('MemLog: ')
      _memory.forEach(element => {
        process.stdout.write(`${element},`)
      })
      process.stdout.write('\n')
    }
  }

  function resetInstruction(newAddress) {
    instruction = {
      address: newAddress,
      opcode: null,
      parameterOne: { mode: '', address: '' },
      parameterTwo: { mode: '', address: '' },
      parameterThree: { mode: '', address: '' },
      nextAddress: 0,
      process: null
    }
  }

  function addInstruction(p1Address, p2Address, p3Address) {
    return function() {
      memory.set(
        p3Address,
        memory.at(p1Address) + memory.at(p2Address)
      )
    }
  }

  function multiplyInstruction(
    p1Address,
    p2Address,
    p3Address
  ) {
    return function() {
      memory.set(
        p3Address,
        memory.at(p1Address) * memory.at(p2Address)
      )
    }
  }

  function inputInstruction(p1Address) {
    return function() {
      memory.set(p1Address, inputs.pop())
    }
  }

  // Returns a high order function so it can be invoked later
  function outputInstruction(p1Address) {
    return function() {
      outputs.push(memory.at(p1Address))
    }
  }

  function jumpIfTrueInstruction(p1Address, p2Address) {
    return function() {
      instruction.nextAddress =
        memory.at(p1Address) !== 0
          ? memory.at(p2Address)
          : instruction.nextAddress
    }
  }

  function jumpIfFalseInstruction(p1Address, p2Address) {
    return function() {
      instruction.nextAddress =
        memory.at(p1Address) === 0
          ? memory.at(p2Address)
          : instruction.nextAddress
    }
  }

  function lessThanInstruction(
    p1Address,
    p2Address,
    p3Address
  ) {
    return function() {
      memory.set(
        p3Address,
        memory.at(p1Address) < memory.at(p2Address) ? 1 : 0
      )
    }
  }

  function equalsInstruction(
    p1Address,
    p2Address,
    p3Address
  ) {
    return function() {
      memory.set(
        p3Address,
        memory.at(p1Address) === memory.at(p2Address)
          ? 1
          : 0
      )
    }
  }

  function getParameterAddress(mode, parameterAddress) {
    return mode === IMMEDIATE
      ? parameterAddress
      : memory.at(parameterAddress)
  }

  function decodeParameterOne(header) {
    instruction.parameterOne.mode = decodeParameterModeOne(
      header
    )
    instruction.parameterOne.address = getParameterAddress(
      instruction.parameterOne.mode,
      instruction.address + 1
    )
  }

  function decodeParameterTwo(header) {
    instruction.parameterTwo.mode = decodeParameterModeTwo(
      header
    )
    instruction.parameterTwo.address = getParameterAddress(
      instruction.parameterTwo.mode,
      instruction.address + 2
    )
  }

  function decodeParameterThree(header) {
    instruction.parameterThree.mode = decodeParameterModeThree(
      header
    )
    instruction.parameterThree.address = getParameterAddress(
      instruction.parameterThree.mode,
      instruction.address + 3
    )
  }

  function finalizeInstruction(header) {
    let result = null

    switch (instruction.opcode) {
      case ADD:
        decodeParameterOne(header)
        decodeParameterTwo(header)
        decodeParameterThree(header)
        result = addInstruction(
          instruction.parameterOne.address,
          instruction.parameterTwo.address,
          instruction.parameterThree.address
        )
        break
      case MULTIPLY:
        decodeParameterOne(header)
        decodeParameterTwo(header)
        decodeParameterThree(header)
        result = multiplyInstruction(
          instruction.parameterOne.address,
          instruction.parameterTwo.address,
          instruction.parameterThree.address
        )
        break
      case INPUT:
        decodeParameterOne(header)
        result = inputInstruction(
          instruction.parameterOne.address
        )
        break
      case OUTPUT:
        decodeParameterOne(header)
        result = outputInstruction(
          instruction.parameterOne.address
        )
        break
      case JUMP_IF_TRUE:
        decodeParameterOne(header)
        decodeParameterTwo(header)
        result = jumpIfTrueInstruction(
          instruction.parameterOne.address,
          instruction.parameterTwo.address
        )
        break
      case JUMP_IF_FALSE:
        decodeParameterOne(header)
        decodeParameterTwo(header)
        result = jumpIfFalseInstruction(
          instruction.parameterOne.address,
          instruction.parameterTwo.address
        )
        break
      case LESS_THAN:
        decodeParameterOne(header)
        decodeParameterTwo(header)
        decodeParameterThree(header)
        result = lessThanInstruction(
          instruction.parameterOne.address,
          instruction.parameterTwo.address,
          instruction.parameterThree.address
        )
        break
      case EQUALS:
        decodeParameterOne(header)
        decodeParameterTwo(header)
        decodeParameterThree(header)
        result = equalsInstruction(
          instruction.parameterOne.address,
          instruction.parameterTwo.address,
          instruction.parameterThree.address
        )
        break
      case HALT:
        break
      default:
        console.log(`Invalid opcode: ${instruction.opcode}`)
    }

    instruction.process = result
  }

  function decodeInstruction() {
    const header = memory.at(instruction.address)
    instruction.opcode = decodeOpcode(header)
    instruction.nextAddress =
      instruction.address +
      addressIncrementLookup[instruction.opcode]
    finalizeInstruction(header)
  }

  function run(csvMemory, _inputs) {
    outputs = []
    inputs = _inputs.reverse()

    if (csvMemory !== null) {
      memory.init(csvMemory)
    }

    resetInstruction(0)
    decodeInstruction()

    while (instruction.opcode !== 'HALT') {
      //console.log(instruction)
      instruction.process()
      resetInstruction(instruction.nextAddress)
      decodeInstruction()
    }

    return outputs.toString()
  }

  return { run, memory }
}

module.exports = {
  makeIntcode,
  ADD,
  MULTIPLY,
  INPUT,
  OUTPUT,
  JUMP_IF_TRUE,
  JUMP_IF_FALSE,
  LESS_THAN,
  EQUALS,
  HALT,
  POSITION,
  IMMEDIATE,
  opcodeLookup,
  parameterModeLookup,
  addressIncrementLookup,
  decodeOpcode,
  decodeParameterModeOne,
  decodeParameterModeTwo,
  decodeParameterModeThree
}
