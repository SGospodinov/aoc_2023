import { inputLines } from './utils';

const [timeStr, distanceStr] = await inputLines(6);

const time = Number(timeStr.substring('Time:      '.length).replaceAll(/\s/g, ''))
const distance = Number(distanceStr.substring('Distance:  '.length).replaceAll(/\s/g, ''))

let winningWays = 0;

for(let chargeT = 0; chargeT < Math.ceil(time/2); chargeT++) {
  const travelT = time - chargeT;
  const distanceTraveled = travelT * chargeT;

  if(distanceTraveled > distance) {
    winningWays++;
  }
}

const answer = (winningWays * 2) + Number(!(time % 2));

console.log(answer);
