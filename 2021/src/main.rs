use std::fs::File;
use std::io::{self, BufRead};
use std::path::Path;

fn read_lines<P>(filename: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
    let file = File::open(filename)?;
    Ok(io::BufReader::new(file).lines())
}


fn main() {
    let mut depths = Vec::new();

    if let Ok(lines) = read_lines("./src/input.txt") {
        // Consumes the iterator, returns an (Optional) String
        for line in lines {
            if let Ok(depth) = line {
                depths.push(depth.parse::<i32>().unwrap());
            }
        }
    }
    // println!("{}", depths.len());

    let mut prev = depths[0];
    let mut increasing_count = 0;
    for depth in depths.iter() {
        // println!("Element at position {}: {:?}", index, depth);
        if prev < *depth {
            increasing_count += 1;
        }
        prev = *depth
    }

    println!("day 1 part 1: {}", increasing_count);

    prev = depths[0] + depths[1] + depths[2];
    increasing_count = 0;
    for (index, depth) in depths.iter().enumerate() {
        if index + 2 > depths.len() - 1 { break; }

        let current = *depth + depths[index+1] + depths[index+2];
        if prev < current {
            increasing_count += 1;
        }
        prev = current;
    }
    println!("day 1 part 2: {}", increasing_count);
}

// day 1 part 1: 1688
// day 1 part 2: 1728