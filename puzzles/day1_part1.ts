import { inputLines } from './utils';

const isNum = (char: string) => !Number.isNaN(parseInt(char));

const answer = (await inputLines(1))
  .map((line) => {
    const chars = line.split('');

    const first = chars.find(isNum) as string;
    const last = chars.findLast(isNum) as string;

    return Number(first + last)
  })
  .reduce((acc, val) => acc + val, 0);

console.log(answer);
