import { readFile } from 'node:fs/promises';

const input = await readFile('inputs/day1', 'utf-8');

const isNum = (char: string) => !Number.isNaN(parseInt(char));

const answer = input.split('\n').slice(0, -1)
  .map((line) => {
    const chars = line.split('');

    const first = chars.find(isNum) as string;
    const last = chars.findLast(isNum) as string;

    return Number(first + last)
  })
  .reduce((acc, val) => acc + val, 0);

console.log(answer);
