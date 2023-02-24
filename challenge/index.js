/**
 * Challenge:
 * 
 * When given n players, m rounds and the teams for all games played,
 * determine if all players play each other in the given games
 */

/**
 * Definitions:
 * 
 * round: number[] - a game played with 2 teams spread into a single array
 * game: number[] - all players in a given round
 *  - game = games[i]
 *  - teamA = game[0], ..., game[n/2 - 1]
 *  - teamB = game[n/2], ..., game[n - 1]
 */

/**
 * Check if `n` players in `m` rounds (captured within `games`) each play `n - 1` different players
 * 
 * @param n - even integer between 1 - 20,000 
 * @param m - integer between 1 - 30 
 * @param games - array of number arrays, each with length n
 * @return {boolean} `n` players all played against `n - 1` different players
 */
export function check(n, m, games) {
  let successfulCheck = false;
  // 2d list recording player matchups against players with larger assigned values
  let tracker = Array(n).map(() => []);
  // Index for separating teams
  const sliceIndex = n/2;

  // Check each round until no rounds left or success criteria is met, whichever comes first
  for (let i = 0; i < m; i++) {
    const round = games[i];
    const team1 = round.slice(0, sliceIndex);
    const team2 = round.slice(sliceIndex);

    tracker = trackMatchups(team1, team2, n, tracker);
    tracker = trackMatchups(team2, team1, n, tracker);

    if (tracker.every((playerMatchups, index) => playerMatchups.length === n - 1 - index)) {
      successfulCheck = true;
      break;
    }
  }

  return successfulCheck;
}

/**
 * Record matchups against "larger" players for a single round
 * 
 * @param teamA - all players in team A
 * @param teamB - all players in team B
 * @param n - even integer between 1 - 20,000 
 * @param tracker - 2d list recording player matchups against players with larger assigned values
 * @return {number[][]} tracker
 */
export function trackMatchups(teamA, teamB, n, tracker) {
  teamA.forEach((player) => {
    console.log({player})
    // If all possible matchups for that player are already recorded
    if (tracker?.[player - 1]?.length === n - player) return;
    
    // Only compare matchups against players with higher values
    const largerPlayers = teamB.filter((player2) => player2 > player);

    // If no players with larger values
    if (!largerPlayers.length) return;

    // If no matchups recorded for that player exist yet
    if (!tracker?.[player - 1]?.length) {
      tracker[player - 1] = largerPlayers;
      return;
    }

    // Add larger numbers and filter out any duplicate matchups
    const uniqueMatchups = new Set([...tracker[player - 1], ...largerPlayers]);
    // Set matchups to filter list
    tracker[player - 1] = Array.from(uniqueMatchups);
    return;
  });

  console.log({tracker})

  return tracker;
}
