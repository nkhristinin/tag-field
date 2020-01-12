import { transformStringToTags } from "../dom";
describe("transformStringToTags", () => {
  it("should return an empty array if parameters not define", () => {
    expect(transformStringToTags()).toEqual([]);
  });

  it("should return tags array which split string by delimiter", () => {
    expect(transformStringToTags([","], "a,b,c")).toEqual(["a", "b", "c"]);
  });

  it("should return tags array which split string with several delimiters", () => {
    expect(transformStringToTags([",", ";", "."], "a,b;c.d")).toEqual(["a", "b", "c", "d"]);
  });

  it("should return tags with trimmed spaces", () => {
    expect(transformStringToTags([","], " a, b, c,  ")).toEqual(["a", "b", "c"]);
  });
});
