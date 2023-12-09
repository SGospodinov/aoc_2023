import { readFile } from 'node:fs/promises';

const NEW_LINE = '\n';

export const inputLines = async (day: number) => {
  const rawFile = await readFile(`inputs/day${day}`, 'utf-8');

  return rawFile.trim().split(NEW_LINE);
};

export const inputString = async (day: number) => {
  const rawFile = await readFile(`inputs/day${day}`, 'utf-8');

  return rawFile.trim();
};
