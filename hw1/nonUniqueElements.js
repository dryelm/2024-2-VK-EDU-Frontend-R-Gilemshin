/*
You are given a non-empty list of integers (X).

For this task,  you should return a list consisting of
only the non-unique elements in this list.

To do so you will need to remove all unique elements
(elements which are contained in a given list only once).

When solving this task, do not change the order of the list.

Example:

input (array of integers): [1, 2, 3, 1, 3]
output (iterable of integers): [1, 3, 1, 3]

1 and 3 are non-unique elements.

More examples:

nonUniqueElements([1, 2, 3, 1, 3]) == [1, 3, 1, 3]
nonUniqueElements([1, 2, 3, 4, 5]) == []
nonUniqueElements([5, 5, 5, 5, 5]) == [5, 5, 5, 5, 5]
nonUniqueElements([10, 9, 10, 10, 9, 8]) == [10, 9, 10, 10, 9]
 */

export default function nonUniqueElements(data) {
  if (!Array.isArray(data)) {
    throw new Error("Input must be an array");
  }

  const counts = new Map();

  data.forEach(item => {
    if (typeof item !== "number" || item.toFixed(0) !== item.toString()){
      throw new Error("Items of array must be an integers");
    }
    counts.set(item, (counts.get(item) || 0) + 1);
  });

  return data.filter(item => counts.get(item) > 1);
}
