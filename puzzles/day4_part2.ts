import { inputLines } from './utils';

interface Card {
  id: number,
  winningNumbers: number[],
  playerNumbers: number[],
  copies: number,
  matchingNumbers: number,
};

const parseNumList = (numbersStr: string): number[] => numbersStr.split(/\s+/).map(Number);

const getMatchingNumbers = (winningNumbers: number[], playerNumbers: number[]): number => {
  const numbersSet = new Set(winningNumbers);
  playerNumbers.forEach((n) => numbersSet.add(n));

  return playerNumbers.length - (numbersSet.size - winningNumbers.length);
};

const parseCard = (cardStr: string): Card => {
  const [idStr, numbers] = cardStr.split(': ');
  const [winningNumsStr, playerNumStr] = numbers.split(' | ');

  const winningNumbers = parseNumList(winningNumsStr);
  const playerNumbers = parseNumList(playerNumStr);

  return {
    id: Number(idStr.substring("Card ".length)),
    winningNumbers,
    playerNumbers,
    copies: 1,
    matchingNumbers: getMatchingNumbers(winningNumbers, playerNumbers),
  };
};

const cards = (await inputLines(4)).map(parseCard);

cards.forEach((card, index, cards) => {
  for (let j = 0; j < card.copies; j++) {
    for (let i = 1; i <= card.matchingNumbers; i++) {
      cards[index + i].copies += 1;
    };
  };
});

const answer = cards.reduce((acc, card) => acc + card.copies, 0);

console.log(answer);
