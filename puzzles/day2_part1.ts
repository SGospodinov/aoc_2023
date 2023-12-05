import { inputLines } from './utils';

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

const BAG = {
  red: 12,
  green: 13,
  blue: 14,
}

const invalidSet = (cubeSet: CubeSet): boolean =>
  cubeSet.red > BAG.red
    || cubeSet.green > BAG.green
    || cubeSet.blue > BAG.blue;

const games = parseGames(await inputLines(2));
const answer = games
  .filter((game) => !game.sets.some(invalidSet))
  .map((game) => game.id)
  .reduce((acc, val) => acc + val, 0);

console.log(answer);
