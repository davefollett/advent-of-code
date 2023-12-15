import { describe, expect, test } from 'vitest';
import Result from './result.js';

describe('@/utils/result.js', () => {
  test('get title()', () => {
    const testTitle = 'Test Result Title';
    const results = new Result(testTitle);

    expect(results.title).toBe(testTitle);
  });
});
