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

// Convert a Vector representing a binary number of 1s and 0s to a single decimal number.  The index
// in the vector is the position the bit is shifted to.
// Example: [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0] = 349
fn to_decimal(vec: &Vec<i32>) -> i32 {
    let mut result = 0;
    for index in 0..vec.len() {
        result |= vec[index] << index;
    }
    return result;
}

struct DiagnosticReport {
    gama_rate: i32,
    epsilon_rate: i32,
    entry_length: i32,
    num_entries: i32,
    oxygen_generator_rating: i32,
    c02_scrubber_rating: i32,
}

impl DiagnosticReport {
    fn calculate_power_consumption(&self) -> i32 {
        self.gama_rate * self.epsilon_rate
    }
    fn calculate_life_support_rating(&self) -> i32 {
        self.oxygen_generator_rating * self.c02_scrubber_rating
    }
}

pub fn run(filename: &str) {

    let raw_diagnostic_report = read_file(filename);

    part_01(&raw_diagnostic_report);
    part_02(&raw_diagnostic_report);
}

fn part_01(raw_diagnostic_report: &Vec<String>) {
    
    let mut report = DiagnosticReport {
        gama_rate: 0,
        epsilon_rate: 0,
        entry_length: raw_diagnostic_report[0].len() as i32,
        num_entries: raw_diagnostic_report.len() as i32,
        oxygen_generator_rating: 0,
        c02_scrubber_rating: 0,
    };

    let mut counts: Vec<i32> = vec![0; report.entry_length as usize];

    for entry in raw_diagnostic_report.iter() {
        let mut index = 0;
        for c in entry.chars().rev() {
            if c == '1' { counts[index] += 1 }
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
    report.gama_rate = to_decimal(&counts);
    report.epsilon_rate = (i32::pow(2, report.entry_length as u32) - 1) - report.gama_rate;

    println!("day 02 part 01: {}", report.calculate_power_consumption());
    // day 02 part 01: 1307354
}

enum Filter {
    MostCommon,
    LeastCommon,
}


fn find_by_filter(numbers: Vec<String>, filter: Filter, index: usize) -> Vec<String> {
    // println!("find_by_filter - start");
    if numbers.len() == 1 {
        // println!("find_by_filter - found number");
        return numbers;
    }

    let new_index = index + 1;
    let mut zeros: Vec<String> = Vec::new();
    let mut ones: Vec<String> = Vec::new();

    for number in numbers.iter() {
        if number.as_bytes()[index] as char == '1' {
            ones.push(number.to_string());
        } else {
            zeros.push(number.to_string());
        }
    }

    // println!("zeros: {:?}", zeros);
    // println!("ones: {:?}", ones);

    return match filter {
        Filter::MostCommon => {
            if zeros.len() > ones.len() {
                find_by_filter(zeros, filter, new_index)
            } else {
                find_by_filter(ones, filter, new_index)
            }
        }
        Filter::LeastCommon => {
            if ones.len() < zeros.len() {
                find_by_filter(ones, filter, new_index)
            } else {
                find_by_filter(zeros, filter, new_index)
            }
        }
    }
}


fn part_02(raw_diagnostic_report: &Vec<String>) {
    let mut report = DiagnosticReport {
        gama_rate: 0,
        epsilon_rate: 0,
        entry_length: raw_diagnostic_report[0].len() as i32,
        num_entries: raw_diagnostic_report.len() as i32,
        oxygen_generator_rating: 0,
        c02_scrubber_rating: 0,
    };

    let oxygen_generator_rating_str = find_by_filter(raw_diagnostic_report.to_vec(), Filter::MostCommon, 0);
    println!("oz str: {:?}", oxygen_generator_rating_str);
    let c02_scrubber_rating_str = find_by_filter(raw_diagnostic_report.to_vec(), Filter::LeastCommon, 0);
    println!("c02 str: {:?} ", c02_scrubber_rating_str);

    println!("day 02 part 02: {}", report.calculate_life_support_rating());
    // day 02 part 02: 
}