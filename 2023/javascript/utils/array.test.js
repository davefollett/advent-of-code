import { chunk } from './array.js';

describe('@/utils/array.js', () => {
  it('will chunk array into groups of 2', () => {
    const arr = [0, 1, 2, 3, 4, 5];
    const result = chunk(arr, 2);

    expect(result.length).toBe(3);
    expect(result[0]).toStrictEqual([0, 1]);
    expect(result[1]).toStrictEqual([2, 3]);
    expect(result[2]).toStrictEqual([4, 5]);
  });

  it('will chunk array into groups of 2 with custom parser', () => {
    function customParser(chunkFunction) {
      return chunkFunction.map((item) => item.toString());
    }

    const arr = [0, 1, 2, 3, 4, 5];
    const result = chunk(arr, 2, customParser);

    expect(result.length).toBe(3);
    expect(result[0]).toStrictEqual(['0', '1']);
    expect(result[1]).toStrictEqual(['2', '3']);
    expect(result[2]).toStrictEqual(['4', '5']);
  });
});
