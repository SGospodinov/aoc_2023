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

const seeds = seedsStr.substring('seeds: '.length).split(' ').map(Number);
const mapRanges = mapsStr.map<AlmanacRange[]>((mapStr) => {
  const [, ...ranges] = mapStr.split('\n');

  return ranges.map(parseRange);
});

const answer = Math.min(
  ...mapRanges.reduce((vals, ranges) => vals.map((val) => {
    const range = ranges.find(inRange(val));
    return range ? getDestination(range, val) : val;
  }), seeds)
);

console.log(answer);
