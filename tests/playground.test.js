import sum from "../playground.js";

test("adds 1 + 2 to equal 3", () => {
  return expect(sum(1, 2)).toBe(3);
});
