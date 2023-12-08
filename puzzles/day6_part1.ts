import { inputLines } from './utils';

const [timesStr, distancesStr] = await inputLines(6);

const times = timesStr.substring('Time:      '.length).split(/\s+/).map(Number);
const distances = distancesStr.substring('Distance:  '.length).split(/\s+/).map(Number);

const answer = times
  .map((time, index) => {
    let winningWays = 0;

    for(let chargeT = 0; chargeT < Math.ceil(time/2); chargeT++) {
      const travelT = time - chargeT;
      const distanceTraveled = travelT * chargeT;

      if(distanceTraveled > distances[index]) {
        winningWays++;
      }
    }

    return (winningWays * 2) + Number(!(time % 2));
  })
  .reduce((acc, val) => acc * val, 1)

console.log(answer);
