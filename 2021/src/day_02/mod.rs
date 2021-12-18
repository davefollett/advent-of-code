use std::fs::File;
use std::io::{BufRead, BufReader};

enum Direction {
    Up(i32),
    Down(i32),
    Forward(i32)
}

struct Position {
    depth: i32,
    horizontal: i32,
    aim: i32,
}

impl Position {
    fn update(&mut self, delta: &Direction, part_01: bool) {
        if part_01 {
            match delta {
                Direction::Up(value) => self.depth -= value,
                Direction::Down(value) => self.depth += value,
                Direction::Forward(value) => self.horizontal += value 
            }
        } else {
            match delta {
                Direction::Up(value) => self.aim -= value,
                Direction::Down(value) => self.aim += value,
                Direction::Forward(value) => {
                    self.horizontal += value;
                    if self.aim != 0 { self.depth += self.aim * value; }
                }
            }
        }
    }

    fn final_calculation(&self) -> i32 {
        self.depth * self.horizontal
    }
}

fn read_file(filename: &str) -> Vec<Direction> {
    let mut directions: Vec<Direction> = Vec::new();
    let file = File::open(filename).unwrap();
    let reader = BufReader::new(file);

    for line in reader.lines() {
        let line = line.unwrap();
        let mut iter = line.split_whitespace();
        let direction = iter.next().unwrap();
        let amount = iter.next().unwrap().parse::<i32>().unwrap();

        directions.push(
            match direction {
                "up" => Direction::Up(amount),
                "down" => Direction::Down(amount),
                "forward" => Direction::Forward(amount),
                _ => unreachable!()
            }
        )
    }

    return directions;
}

pub fn run(filename: &str) {

    let directions = read_file(filename);

    part_01(&directions);
    part_02(&directions);
}

fn part_01(directions: &Vec<Direction>) {
    let mut sub_position = Position {
        depth: 0,
        horizontal: 0,
        aim: 0,
    };
    
    for direction in directions.iter() {
        sub_position.update(direction, true);
    }

    println!("day 02 part 01: {}", sub_position.final_calculation());
    // day 02 part 01: 2027977
}

fn part_02(directions: &Vec<Direction>) {
    let mut sub_position = Position {
        depth: 0,
        horizontal: 0,
        aim: 0,
    };
    
    for direction in directions.iter() {
        sub_position.update(direction, false);
    }

    println!("day 02 part 02: {}", sub_position.final_calculation());
    // day 02 part 02: 1903644897
}