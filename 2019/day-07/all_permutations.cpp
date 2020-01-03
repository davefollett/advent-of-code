/**
 * Date: 17 Dec 2019
 * Author: Dave Follett
 * 
 * Description:
 *   This C++ program emits all permutations of the numbers: 0, 1, 2, 3, 4 to 
 *   standard output in the form of a JavaScript array of arrays for the
 *   2019 Advent of Code Day 7 Part 1 challenge. 
 * 
 * Compile & execute command:
 *   g++ all_permutations.cpp && ./a.out
 */

#include <iostream>
#include <algorithm>

int main () {

  int sequence[] = {0, 1, 2, 3, 4};

  std::cout << "let sequence = [" << std::endl;
  do {
    std::cout << "  [" << sequence[0] << ", " << sequence[1] << ", " << sequence[2] << ", " << sequence[3] << ", " << sequence[4] << "]," << std::endl;
  } while ( std::next_permutation(sequence, sequence + 5) );

  std::cout << "];" << std::endl;

  return 0;
}
