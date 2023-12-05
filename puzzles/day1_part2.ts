import { inputLines } from './utils';

const DIGITS: {[k: string]: string} = {
  'one': '1',
  '1': '1',
  'two': '2',
  '2': '2',
  'three': '3',
  '3': '3',
  'four': '4',
  '4': '4',
  'five': '5',
  '5': '5',
  'six': '6',
  '6': '6',
  'seven': '7',
  '7': '7',
  'eight': '8',
  '8': '8',
  'nine': '9',
  '9': '9',
};

const answer = (await inputLines(1))
  .map((line) => {
    const [first] = Object.keys(DIGITS)
      .map<[string, number]>((d) => [d, line.indexOf(d)])
      .filter(([_, index]) => index >= 0)
      .reduce((min, curr) => {
        return min[1] < curr[1] ? min : curr
      }, ['error', Infinity]);

    const [last] = Object.keys(DIGITS)
      .map<[string, number]>((d) => [d, line.lastIndexOf(d)])
      .filter(([_, index]) => index >= 0)
      .reduce((max, curr) => {
        if (!max) return curr;
        return max[1] > curr[1] ? max : curr
      }, ['error', -Infinity]);

    return Number(DIGITS[first] + DIGITS[last])
  })
  .reduce((acc, val) => acc + val, 0);

console.log(answer);
