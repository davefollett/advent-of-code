use std::fs::File;
use std::io::{BufRead, BufReader};

fn read_file(filename: &str) -> Vec<String> {
    let mut result: Vec<String> = Vec::new();
    let file = File::open(filename).unwrap();
    let reader = BufReader::new(file);

    for line in reader.lines() {
        let line = line.unwrap();
        result.push(line);
    }

    return result;
}

struct DiagnosticReport {
    gama_rate: i32,
    epsilon_rate: i32,
    entry_length: i32,
    num_entries: i32,
}

impl DiagnosticReport {
    fn calculate_power_consumption(&self) -> i32 {
        self.gama_rate * self.epsilon_rate
    }
}

pub fn run(filename: &str) {

    let raw_diagnostic_report = read_file(filename);

    part_01(&raw_diagnostic_report);
    // part_02(&directions);
}

fn part_01(raw_diagnostic_report: &Vec<String>) {
    
    let mut report = DiagnosticReport {
        gama_rate: 0,
        epsilon_rate: 0,
        entry_length: raw_diagnostic_report[0].len() as i32,
        num_entries: raw_diagnostic_report.len() as i32,
    };

    println!("report.entry_length: {} report.num_entries {}", report.entry_length, report.num_entries);

    let mut counts: Vec<i32> = vec![0; report.entry_length as usize];

    // let entry = &raw_diagnostic_report[0];
    for entry in raw_diagnostic_report.iter() {
        let mut index = 0;
        for c in entry.chars().rev() {
            if c == '1' { counts[index] += 1 }
            //println!("value: {}", c);
            index += 1;
        }
    }
    println!("counts: {:?}", counts);
    for index in 0..counts.len() {
        if counts[index] > report.num_entries / 2 {
            counts[index] = 1;
        } else {
            counts[index] = 0;
        }
    }
    println!("counts: {:?}", counts);
    for index in 0..counts.len() {
        report.gama_rate |= counts[index] << index;
    }

    println!("gamma_rate: {}", report.gama_rate);
    report.epsilon_rate = (i32::pow(2, report.entry_length as u32) - 1) - report.gama_rate;
    println!("epsilon_rate: {}", report.epsilon_rate);

    println!("day 02 part 02: {}", report.calculate_power_consumption());
}

// fn part_02(directions: &Vec<Direction>) {
//     let mut sub_position = Position {
//         depth: 0,
//         horizontal: 0,
//         aim: 0,
//     };
    
//     for direction in directions.iter() {
//         sub_position.update(direction, false);
//     }

//     println!("day 02 part 02: {}", sub_position.final_calculation());
//     // day 02 part 02: 1903644897
// }