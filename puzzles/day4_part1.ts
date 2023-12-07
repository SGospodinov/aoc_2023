import { inputLines } from '../../../../../Users/gospos01/Code/aoc_2023/puzzles/utils';

interface Card {
  winningNumbers: number[],
  playerNumbers: number[],
};

const parseNumList = (numbersStr: string): number[] => numbersStr.split(/\s+/).map(Number);

const parseCard = (cardStr: string): Card => {
  const [,numbers] = cardStr.split(': ');
  const [winningNumsStr, playerNumStr] = numbers.split(' | ');

  return {
    winningNumbers: parseNumList(winningNumsStr),
    playerNumbers: parseNumList(playerNumStr),
  };
};

const cardPoints = (card: Card): number => {
  const numbersSet = new Set(card.winningNumbers);
  card.playerNumbers.forEach((n) => numbersSet.add(n));

  const matchingNumbers = card.playerNumbers.length - (numbersSet.size - card.winningNumbers.length);
  return Math.floor(Math.pow(2, matchingNumbers - 1));
};

const answer = (await inputLines(4))
  .map(parseCard)
  .map(cardPoints)
  .reduce((acc, val) => acc + val, 0);


console.log(answer);
