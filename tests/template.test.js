import { describe, it, expect } from "@jest/globals";

function sum(a, b) {
  return a + b;
}

describe("Executando teste", () => {
  it("Deve somar dois números", () => {
    expect(sum(1, 2)).toBe(3);
  });
});
