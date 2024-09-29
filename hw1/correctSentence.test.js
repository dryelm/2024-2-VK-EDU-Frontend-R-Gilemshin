import correctSentence from './correctSentence';

test('returns correct sentence without reverse', () => {
  expect(correctSentence("greetings, friends")).toBe("Greetings, friends.");
  expect(correctSentence("Greetings, friends")).toBe("Greetings, friends.");
  expect(correctSentence("Greetings, friends.")).toBe("Greetings, friends.");
  expect(correctSentence("hello world")).toBe("Hello world.");
  expect(correctSentence("Hello world")).toBe("Hello world.");
  expect(correctSentence("Hello world.")).toBe("Hello world.");
});

test('returns correct sentence with reverse', () => {
  expect(correctSentence("greetings, friends", true)).toBe("Sdneirf ,sgniteerg.");
  expect(correctSentence("Hello world", true)).toBe("Dlrow olleh.");
  expect(correctSentence("hi", true)).toBe("Ih.");
  expect(correctSentence("Hi", true)).toBe("Ih.");
  expect(correctSentence("Hi.", true)).toBe("Ih.");
});

test('throws error for non-string input', () => {
  expect(() => correctSentence(123)).toThrow("Input must be a string");
  expect(() => correctSentence({})).toThrow("Input must be a string");
  expect(() => correctSentence([])).toThrow("Input must be a string");
  expect(() => correctSentence(null)).toThrow("Input must be a string");
  expect(() => correctSentence(undefined)).toThrow("Input must be a string");
});