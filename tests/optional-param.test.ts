import { parse } from "../src";

it("optional param -JSDoc style", () => {
  const result = parse(`
  /**
  * @param {string} [somebody] - Somebody's name.
  */
  export function sayHello(somebody) {
    if (!somebody) {
        somebody = 'John Doe';
    }
    alert('Hello ' + somebody);
  }
  `);
  expect(result.tags).toEqual([
    {
      name: "param",
      text: [
        {
          text: "somebody",
          kind: "parameterName",
        },
        {
          text: " ",
          kind: "space",
        },
        {
          text: "- Somebody's name.",
          kind: "text",
        },
      ],
    },
  ]);
});
