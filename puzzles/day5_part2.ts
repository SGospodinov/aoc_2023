import { inputString } from './utils';

const input = await inputString(5);

interface AlmanacRange {
  srcStart: number,
  destStart: number,
  length: number,
};

const parseRange = (rangeStr: string): AlmanacRange => {
  const [destStart, srcStart, length] = rangeStr.split(' ').map(Number);

  return {
    destStart,
    srcStart,
    length,
  };
};

const inRange = (val: number) => (range: AlmanacRange): boolean =>
  val >= range.srcStart && val < range.srcStart + range.length;

const getDestination = (range: AlmanacRange, sourceVal: number): number =>
  range.destStart + (sourceVal - range.srcStart);

const [seedsStr, ...mapsStr] = input.split('\n\n');

const seedsRanges = seedsStr.substring('seeds: '.length).split(' ').map(Number);

const maps = mapsStr.map<AlmanacRange[]>((mapStr) => {
  const [, ...ranges] = mapStr.split('\n');

  return ranges.map(parseRange);
});

const getLocation = (seed: number) => maps.reduce((val, ranges) => {
  const range = ranges.find(inRange(val))
  return range ? getDestination(range, val) : val;
}, seed);

let answer = Infinity;

for(let i = 0; i < seedsRanges.length / 2; i++) {
  for(let j = 0; j < seedsRanges[(i * 2) + 1]; j++) {
    const location = getLocation(seedsRanges[(i * 2)] + j);
    if (location < answer) answer = location;
  };
};

console.log(answer);
