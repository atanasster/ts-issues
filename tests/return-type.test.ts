import { parse } from "../src";

it("types missing", () => {
  const result = parse(`
  /**
   * Returns the sum of a and b
   * @param {number} a
   * @param {number} b
   * @returns {number} Sum of a and b
   */
  export function sum(a, b) {
      return a + b;
  }
  `);
  expect(result.tags).toMatchObject([
    {
      name: "param",
      text: [
        {
          text: "a",
          kind: "text",
        },
      ],
    },
    {
      name: "param",
      text: [
        {
          text: "b",
          kind: "text",
        },
      ],
    },
    {
      name: "returns",
      text: [
        {
          text: "Sum of a and b",
          kind: "text",
        },
      ],
    },
  ]);
});
