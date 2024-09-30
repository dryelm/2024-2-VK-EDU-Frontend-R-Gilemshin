import nonUniqueElements from './nonUniqueElements';


test('returns non unique elements', () => {
  expect(nonUniqueElements([1, 2, 3, 1, 3])).toEqual([1, 3, 1, 3]);
  expect(nonUniqueElements([1, 2, 3, 4, 5])).toEqual([]);
  expect(nonUniqueElements([5, 5, 5, 5, 5])).toEqual([5, 5, 5, 5, 5]);
  expect(nonUniqueElements([10, 9, 10, 10, 9, 8])).toEqual([10, 9, 10, 10, 9]);
})

test('throws error for non-array input', () => {
  expect(() => nonUniqueElements(123)).toThrow("Input must be an array");
  expect(() => nonUniqueElements("test")).toThrow("Input must be an array");
  expect(() => nonUniqueElements({ a: 1, b: 2 })).toThrow("Input must be an array");
  expect(() => nonUniqueElements(null)).toThrow("Input must be an array");
  expect(() => nonUniqueElements(undefined)).toThrow("Input must be an array");
  expect(() => nonUniqueElements(true)).toThrow("Input must be an array");
});

test('throws error if not number in items', () => {
  expect(() => nonUniqueElements([1, 2, "3"])).toThrow("Items of array must be an integers");
  expect(() => nonUniqueElements(["3"])).toThrow("Items of array must be an integers");
  expect(() => nonUniqueElements([1, 2, 3.1])).toThrow("Items of array must be an integers");
  expect(() => nonUniqueElements([1, 2, 0.2])).toThrow("Items of array must be an integers");
});
