export default class Result {
  #title;

  #part1 = {
    answer: 'TBD',
    time: 0,
  };

  #part2 = {
    answer: 'TBD',
    time: 0,
  };

  constructor(title) {
    this.#title = title;
  }

  get title() {
    return this.#title;
  }

  get part1() {
    return this.#part1;
  }

  get part2() {
    return this.#part2;
  }

  set part1Answer(answer) {
    this.#part1.answer = answer;
  }

  set part1Time(time) {
    this.#part1.time = time;
  }

  set part2Answer(answer) {
    this.#part2.answer = answer;
  }

  set part2Time(time) {
    this.#part2.time = time;
  }
}
