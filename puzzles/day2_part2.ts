import { inputLines } from '../../../../../Users/gospos01/Code/aoc_2023/puzzles/utils';

interface CubeSet {
  red: number,
  green: number,
  blue: number,
};

type Color = keyof CubeSet;

interface Game {
  id: number,
  sets: CubeSet[],
};

const parseCubes = (cubes: string): [Color, number] => {
  const [val, color] = cubes.split(' ') as [string, Color];

  return [color, parseInt(val)];
};

const parseSet = (setStr: string): CubeSet => setStr.split(', ')
  .reduce((set, cubesStr) => {
    const [color, val] = parseCubes(cubesStr);

    return { ...set, [color]: val };
  }, { red: 0, green: 0, blue: 0,});

const parseGames = (lines: string[]): Game[] => lines.map((line) => {
  const [gameLabel, cubeSetsString] = line.split(': ');
  const id = parseInt(gameLabel.substring("Game ".length));
  const sets = cubeSetsString.split('; ').map<CubeSet>(parseSet);
  return { id, sets };
});

const gamePower = (game: Game): number => {
  const r =  Math.max(...game.sets.map(({ red }) => red));
  const g =  Math.max(...game.sets.map(({ green }) => green));
  const b =  Math.max(...game.sets.map(({ blue }) => blue));

  return r * g * b;
};

const games = parseGames(await inputLines(2));
const answer = games
  .map(gamePower)
  .reduce((acc, val) => acc + val, 0);

console.log(answer);
