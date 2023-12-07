import { inputLines } from './utils';

interface Card {
  id: number,
  winningNumbers: number[],
  playerNumbers: number[],
  copies: number,
};

const parseNumList = (numbersStr: string): number[] => numbersStr.split(/\s+/).map(Number);

const parseCard = (cardStr: string): Card => {
  const [idStr, numbers] = cardStr.split(': ');
  const [winningNumsStr, playerNumStr] = numbers.split(' | ');

  return {
    id: Number(idStr.substring("Card ".length)),
    winningNumbers: parseNumList(winningNumsStr),
    playerNumbers: parseNumList(playerNumStr),
    copies: 1,
  };
};

const matchingNumbers = (card: Card): number => {
  const numbersSet = new Set(card.winningNumbers);
  card.playerNumbers.forEach((n) => numbersSet.add(n));

  return card.playerNumbers.length - (numbersSet.size - card.winningNumbers.length);
};

const cards = (await inputLines(4)).map(parseCard);

cards.forEach((card, index, cards) => {
  for (let j = 0; j < card.copies; j++) {
    for (let i = 1; i <= matchingNumbers(card); i++) {
      cards[index + i].copies += 1;
    };
  };
});

const answer = cards.reduce((acc, card) => acc + card.copies, 0);

console.log(answer);
