// https://adventofcode.com/2023/day/5

import { performance } from 'node:perf_hooks';
import Result from '../utils/result.js';
import fileParser, { fileParserToObject } from '../utils/file-parser.js';
import { sortNumbersAscending } from '../utils/array.js';


function mapLookup(number, map) {
  for (const mapRow of map) {
    if (number >= mapRow.srcStart && number <= mapRow.srcEnd) {
      return number - mapRow.srcStart + mapRow.destStart;
    }
  }
  return number;
}

function mapLookupReverse(number, map) {
  for (const mapRow of map) {
    if (number >= mapRow.destStart && number <= mapRow.destEnd) {
      return number - mapRow.destStart + mapRow.srcStart;
    }
  }
  return number;
}

export function part1(filename) {
  const lines = fileParser(filename);

  let seeds = [];
  const maps = {
    'seed-to-soil': [],
    'soil-to-fertilizer': [],
    'fertilizer-to-water': [],
    'water-to-light': [],
    'light-to-temperature': [],
    'temperature-to-humidity': [],
    'humidity-to-location': [],
  };

  let processingMap = false;
  let key = '';
  for (const line of lines) {
    if (line.length === 0) {
      processingMap = false;
    } else if (line.startsWith('seeds:')) {
      seeds = [...line.split(': ')[1].split(' ')];
    } else if (line.includes('map:')) {
      key = line.split(' ')[0];
      processingMap = true;
    } else if (processingMap) {
      const destStart = parseInt(line.split(' ')[0], 10);
      const srcStart =  parseInt(line.split(' ')[1], 10);
      const range =  parseInt(line.split(' ')[2], 10);
      const mapRow = {
        destStart,
        destEnd: destStart + range - 1,
        srcStart,
        srcEnd: srcStart + range - 1,
        range,
      }
      maps[key].push(mapRow)
    }
  }

  const locations = [];
  for (const seed of seeds) {
    const soil = mapLookup(parseInt(seed, 10), maps['seed-to-soil']);
    const fertilizer = mapLookup(soil, maps['soil-to-fertilizer']);
    const water = mapLookup(fertilizer, maps['fertilizer-to-water']);
    const light = mapLookup(water, maps['water-to-light']);
    const temperature = mapLookup(light, maps['light-to-temperature']);
    const humidity = mapLookup(temperature, maps['temperature-to-humidity']);
    const location = mapLookup(humidity, maps['humidity-to-location']);
    locations.push(location)
  }

  return sortNumbersAscending(locations)[0];
}

function isValidSeed(seeds, seed) {
  for (const range of seeds) {
    if (seed >= range.start && seed <= range.end) {
      return true;
    }
  }
  return false;
}

export function part2(filename) {
  const lines = fileParser(filename);

  let seedsRanges = [];
  const maps = {
    'seed-to-soil': [],
    'soil-to-fertilizer': [],
    'fertilizer-to-water': [],
    'water-to-light': [],
    'light-to-temperature': [],
    'temperature-to-humidity': [],
    'humidity-to-location': [],
  };

  let processingMap = false;
  // let currentMap = null;
  let key = '';
  for (const line of lines) {
    if (line.length === 0) {
      processingMap = false;
    } else if (line.startsWith('seeds:')) {
      seedsRanges = line.split(': ')[1].split(' ');
    } else if (line.includes('map:')) {
      key = line.split(' ')[0];
      processingMap = true;
    } else if (processingMap) {
      // console.log('start map')
      const destStart = parseInt(line.split(' ')[0], 10);
      const srcStart =  parseInt(line.split(' ')[1], 10);
      const range =  parseInt(line.split(' ')[2], 10);
      // const srcEnd = srcStart + range - 1

      // for (let i = srcStart; i <= srcEnd; i += 1) {
        // currentMap.set(i, i - srcStart + destStart)
        // currentMap[i] = i - srcStart + destStart;
        // console.log(Object.keys(currentMap).length)
      // }
      // console.log('end map')
      const mapRow = {
        destStart,
        destEnd: destStart + range - 1,
        srcStart,
        srcEnd: srcStart + range - 1,
        range,
      }
      maps[key].push(mapRow)
    }
  }

  let seeds = []
  for (let i = 0; i <= seedsRanges.length - 2; i += 2) {
    let start = parseInt(seedsRanges[i], 10);
    const end = start + parseInt(seedsRanges[i + 1], 10) - 1;
    seeds.push({start, end})
  }

// console.log('here')

  // const resultLocations = [];
  let minLocation = Number.MAX_SAFE_INTEGER;

  // console.log(seedsRanges)
  for (let i = 0; i < Number.MAX_SAFE_INTEGER; i += 1) {
    const humidity = mapLookupReverse(i, maps['humidity-to-location']);
    const temperature = mapLookupReverse(humidity, maps['temperature-to-humidity']);
    const light = mapLookupReverse(temperature, maps['light-to-temperature']);
    const water = mapLookupReverse(light, maps['water-to-light']);
    const fertilizer = mapLookupReverse(water, maps['fertilizer-to-water']);
    const soil = mapLookupReverse(fertilizer, maps['soil-to-fertilizer']);
    const seed = mapLookupReverse(soil, maps['seed-to-soil']);

    if (isValidSeed(seeds, seed)) {
      console.log("location", i)
      return i;
    }
      // const soil = mapLookupReverse(parseInt(seed, 10), maps['seed-to-soil']);
      // const fertilizer = mapLookupReverse(soil, maps['soil-to-fertilizer']);
      // const water = mapLookupReverse(fertilizer, maps['fertilizer-to-water']);
      // const light = mapLookupReverse(water, maps['water-to-light']);
      // const temperature = mapLookupReverse(light, maps['light-to-temperature']);
      // const humidity = mapLookupReverse(temperature, maps['temperature-to-humidity']);
      // const location = mapLookupReverse(humidity, maps['humidity-to-location']);

    // if (location < minLocation) { 
    //   minLocation = location;
    // }
    // locations.push(location)
  }
  

    // for (const seed of seeds) {
    //   const soil = mapLookup(parseInt(seed, 10), maps['seed-to-soil']);
    //   const fertilizer = mapLookup(soil, maps['soil-to-fertilizer']);
    //   const water = mapLookup(fertilizer, maps['fertilizer-to-water']);
    //   const light = mapLookup(water, maps['water-to-light']);
    //   const temperature = mapLookup(light, maps['light-to-temperature']);
    //   const humidity = mapLookup(temperature, maps['temperature-to-humidity']);
    //   const location = mapLookup(humidity, maps['humidity-to-location']);
    //   locations.push(location)
    // }

    // resultLocations.push(sortNumbersAscending(locations)[0])
  // }


  
  // for (const seed of seeds) {
  //   const soil = mapLookup(parseInt(seed, 10), maps['seed-to-soil']);
  //   const fertilizer = mapLookup(soil, maps['soil-to-fertilizer']);
  //   const water = mapLookup(fertilizer, maps['fertilizer-to-water']);
  //   const light = mapLookup(water, maps['water-to-light']);
  //   const temperature = mapLookup(light, maps['light-to-temperature']);
  //   const humidity = mapLookup(temperature, maps['temperature-to-humidity']);
  //   const location = mapLookup(humidity, maps['humidity-to-location']);
  //   locations.push(location)
  // }

  // console.log('seeds', seeds)
  // return sortNumbersAscending(resultLocations)[0];
  return minLocation;
  
}








// export function part22(filename) {
//   const lines = fileParser(filename);

//   // const seeds = new Set();
//   let seedsRanges = [];
//   const maps = {
//     'seed-to-soil': [],
//     'soil-to-fertilizer': [],
//     'fertilizer-to-water': [],
//     'water-to-light': [],
//     'light-to-temperature': [],
//     'temperature-to-humidity': [],
//     'humidity-to-location': [],
//   };

//   const toSoil = {};//new Map();
//   const toFertilizer = {};//new Map();
//   const toWater = {};//new Map();
//   const toLight = {};//new Map();
//   const toTemperature = {};//new Map();
//   const toHumidity = {};//new Map();
//   const toLocation = {};//new Map();

//   let processingMap = false;
//   let currentMap = null;
//   let key = '';
//   for (const line of lines) {
//     if (line.length === 0) {
//       processingMap = false;
//     } else if (line.startsWith('seeds:')) {
//       seedsRanges = line.split(': ')[1].split(' ');
//     } else if (line.includes('map:')) {
//       key = line.split(' ')[0];
//       processingMap = true;
      
//       if (key === 'seed-to-soil') { console.log('toSoil'); currentMap = toSoil } 
//       else if (key === 'soil-to-fertilizer') {console.log('toFertilizer'); currentMap = toFertilizer }
//       else if (key === 'fertilizer-to-water') { currentMap = toWater }
//       else if (key === 'water-to-light') { currentMap = toLight }
//       else if (key === 'light-to-temperature') { currentMap = toTemperature }
//       else if (key === 'temperature-to-humidity') { currentMap = toHumidity }
//       else if (key === 'humidity-to-location') { currentMap = toLocation }

//     } else if (processingMap) {
//       console.log('start map')
//       const destStart = parseInt(line.split(' ')[0], 10);
//       const srcStart =  parseInt(line.split(' ')[1], 10);
//       const range =  parseInt(line.split(' ')[2], 10);
//       const srcEnd = srcStart + range - 1

//       for (let i = srcStart; i <= srcEnd; i += 1) {
//         // currentMap.set(i, i - srcStart + destStart)
//         currentMap[i] = i - srcStart + destStart;
//         // console.log(Object.keys(currentMap).length)
//       }
//       console.log('end map')
//       // const mapRow = {
//       //   destStart,
//       //   destEnd: destStart + range - 1,
//       //   srcStart,
//       //   srcEnd: srcStart + range - 1,
//       //   range,
//       // }
//       // maps[key].push(mapRow)
//     }
//   }

// console.log('here')

//   // const resultLocations = [];
//   let minLocation = Number.MAX_SAFE_INTEGER;

//   // console.log(seedsRanges)
//   for (let i = 0; i <= seedsRanges.length - 2; i += 2) {
//     let start = parseInt(seedsRanges[i], 10);
//     const end = start + parseInt(seedsRanges[i + 1], 10) - 1;
//     // console.log(start, end)
//     // const seeds = new Set();
//     // const locations = [];
//     for (start; start <= end; start += 1) {
//       // console.log('add ', start)
//       // seeds.add(start);
//       // for (const seed of seeds) {
//         // const soil = mapLookup(parseInt(start, 10), maps['seed-to-soil']);
//         // const fertilizer = mapLookup(soil, maps['soil-to-fertilizer']);
//         // const water = mapLookup(fertilizer, maps['fertilizer-to-water']);
//         // const light = mapLookup(water, maps['water-to-light']);
//         // const temperature = mapLookup(light, maps['light-to-temperature']);
//         // const humidity = mapLookup(temperature, maps['temperature-to-humidity']);
//         // const location = mapLookup(humidity, maps['humidity-to-location']);
//   //       const toSoil = new Map();
//   // const toFertilizer = new Map();
//   // const toWater = new Map();
//   // const toLight = new Map();
//   // const toTemperature = new Map();
//   // const toHumidity = new Map();
//   // const toLocation = new Map();

//         const soil = toSoil[start] || start;
//         const fertilizer = toFertilizer[soil] || soil;
//         const water = toWater[fertilizer] || fertilizer;
//         const light = toLight[water] || water;
//         const temperature = toTemperature[light] || light;
//         const humidity = toHumidity[temperature] || temperature;
//         const location = toLocation[humidity] || humidity;
//         if (location < minLocation) { 
//           minLocation = location;
//         }
//         // locations.push(location)
//       }
  
//       // resultLocations.push(sortNumbersAscending(locations)[0])
//     }

//     // for (const seed of seeds) {
//     //   const soil = mapLookup(parseInt(seed, 10), maps['seed-to-soil']);
//     //   const fertilizer = mapLookup(soil, maps['soil-to-fertilizer']);
//     //   const water = mapLookup(fertilizer, maps['fertilizer-to-water']);
//     //   const light = mapLookup(water, maps['water-to-light']);
//     //   const temperature = mapLookup(light, maps['light-to-temperature']);
//     //   const humidity = mapLookup(temperature, maps['temperature-to-humidity']);
//     //   const location = mapLookup(humidity, maps['humidity-to-location']);
//     //   locations.push(location)
//     // }

//     // resultLocations.push(sortNumbersAscending(locations)[0])
//   // }


  
//   // for (const seed of seeds) {
//   //   const soil = mapLookup(parseInt(seed, 10), maps['seed-to-soil']);
//   //   const fertilizer = mapLookup(soil, maps['soil-to-fertilizer']);
//   //   const water = mapLookup(fertilizer, maps['fertilizer-to-water']);
//   //   const light = mapLookup(water, maps['water-to-light']);
//   //   const temperature = mapLookup(light, maps['light-to-temperature']);
//   //   const humidity = mapLookup(temperature, maps['temperature-to-humidity']);
//   //   const location = mapLookup(humidity, maps['humidity-to-location']);
//   //   locations.push(location)
//   // }

//   // console.log('seeds', seeds)
//   // return sortNumbersAscending(resultLocations)[0];
//   return minLocation;
// }

export function run() {
  const filename = './day-05/input.txt';
  const results = new Result('Day 05');

  let start = performance.now();
  results.part1.answer = part1(filename);
  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2(filename);
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
}
