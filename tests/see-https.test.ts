import { parse } from "../src";

it("@see https link", () => {
  const result = parse(`
  /**
   * @see https://reactjs.org/docs/context.html#classcontexttype
   */
  export class Component{
    static contextType?: Context<any>;
  }
  `);
  expect(result.tags).toEqual([
    {
      name: "see",
      text: [
        {
          text: "https://reactjs.org/docs/context.html#classcontexttype",
          kind: "text",
        },
      ],
    },
  ]);
});
