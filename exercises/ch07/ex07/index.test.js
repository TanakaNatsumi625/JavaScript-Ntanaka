import { bubbleSort } from "./index.js";

test("bubbleSort", () => {
    const array = [5, 3, 8, 4, 2];
    const sortedArray = bubbleSort(array);
    expect(sortedArray).toEqual([2, 3, 4, 5, 8]);
});