import "jest";
import { check, trackMatchups } from "./index";

describe("challenge", () => {
  test("check n = 2, m = 1 - should pass", () => {
    const games = [[1, 2]];
    expect(check(2, 1, games)).toBe(true);
  });

  test("check n = 4, m = 2 - should pass", () => {
    const games = [[1, 2, 3, 4], [1, 3, 2, 4]];
    expect(check(4, 2, games)).toBe(true);
  });

  test("check n = 4, m = 2 - should fail", () => {
    const games = [[1, 2, 3, 4], [4, 3, 1, 2]];
    expect(check(4, 2, games)).toBe(false);
  });

  test("check n = 6, m = 6 - should pass", () => {
    const games = [[1, 6, 3, 4, 5, 2], [6, 4, 2, 3, 1, 5], [4, 2, 1, 5, 6, 3], [4, 5, 1, 6, 2, 3], [3, 2, 5, 1, 6, 4], [2, 3, 6, 4, 1, 5]];
    expect(check(6, 6, games)).toBe(true);
  });

  test("check n = 6, m = 6 - should fail", () => {
    const games = [[3, 1, 4, 5, 6, 2], [5, 3, 2, 4, 1, 6], [5, 3, 6, 4, 2, 1], [6, 5, 3, 2, 1, 4], [5, 4, 1, 2, 6, 3], [4, 1, 6, 2, 5, 3]];
    expect(check(6, 6, games)).toBe(false);
  });

  test("trackMatchups - only updates tracker for players in teamA", () => {
    const teamA = [1, 2];
    const teamB = [3, 4];
    const tracker = [[3, 4], [], [4]];
    const expectedReturn = [[3, 4], [3, 4], [4]];
    expect(trackMatchups(teamA, teamB, 4, tracker)).toMatchObject(expectedReturn);
  });

  test("trackMatchups - doesn't modify tracker if already populated for those players", () => {
    const teamA = [1, 2];
    const teamB = [3, 4];
    const tracker = [[2, 3, 4], [3, 4], []];
    const expectedReturn = [[2, 3, 4], [3, 4], []];
    expect(trackMatchups(teamA, teamB, 4, tracker)).toMatchObject(expectedReturn);
  });
});