// https://adventofcode.com/2019/day/6

const fs = require("fs");
const { performance } = require("perf_hooks");

let results = {
  title: "Day 06",
  part1: {
    answer: "TBD",
    time: 0
  },
  part2: {
    answer: "TBD",
    time: 0
  }
};


function countOrbits(orbitTree, current) {

  let result = 0;

  if(current.parent === null) {
    return result + 1;
  }

  return countOrbits(orbitTree, orbitTree[current.parent]) + 1;
}

function part1(input) {

  let result = 0;

  orbitTree = {
    "COM": {
      parent: null,
    }
  };

  let orbits = input
    .split(require('os').EOL)
    .map(line => {
      const [parent, child] = line.split(")");
      return {parent: parent, child: child}
    });

  console.log(orbits)

  let parent = "COM";
  //let index = 0;
  let child = ""

  while(orbits.length !== 0) {
    //console.log("here")
    

    // let child = ""

    let index = orbits.findIndex(element => {
      //console.log(element)
      return element.parent === parent;
    });

    if(index !== -1) {
      //console.log("found it");
      child = orbits[index].child;
      parent = orbits[index].parent;

      orbitTree[child] = {
        parent: parent
      }
    //   console.log(orbitTree);
    //   result += countOrbits(orbitTree, orbitTree[parent]);
       orbits.splice(index, 1);

    } else {
      //console.log("no found it");
      parent = child;
    }
    //orbits.splice(index, 1);
    console.log(orbits.length)
  }
  console.log(orbitTree);

  // let COM = orbits.filter(function(orbit, index, node) {
  //   console.log(this.value)
  //   return orbit.parent === this;
  // });

  // console.log(COM)


  // while(orbits.length !== 0) {

  //   orbits


  // }



  //   .forEach(line => {
  //     const [parent, child] = line.split(")");
      
  //     orbitTree[child] = {
  //       parent: parent,
  //     }
  //     result += countOrbits(orbitTree, orbitTree[parent]);
  //     //console.log(orbitTree);
  //   });

    //console.log(orbitTree);

  return result;
}
exports.part1 = part1;

function part2() {
  return 0;
}

exports.run = function run() {
  
  let start = performance.now();
  
  let input = fs.readFileSync("./day-06/test.txt", 'utf-8');
  results.part1.answer = part1(input);

  results.part1.time = (performance.now() - start).toFixed(2);

  start = performance.now();
  results.part2.answer = part2();
  results.part2.time = (performance.now() - start).toFixed(2);

  return results;
};

// function part1(input) {

//   let result = 0;

//   orbitTree = {
//     "COM": {
//       parent: null,
//     }
//   };

//   let orbits = input
//     .split(require('os').EOL)
//     .forEach(line => {
//       const [parent, child] =line.split(")");
      
//       orbitTree[child] = {
//         parent: parent,
//       }
//       result += countOrbits(orbitTree, orbitTree[parent]);
//       //console.log(orbitTree);
//     });

//     //console.log(orbitTree);

//   return result;
// }