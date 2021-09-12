import { NotImplementedError } from '../extensions/index.js';

/**
 * Create transformed array based on the control sequences that original
 * array contains
 *
 * @param {Array} arr initial array
 * @returns {Array} transformed array
 *
 * @example
 *
 * transform([1, 2, 3, '--double-next', 4, 5]) => [1, 2, 3, 4, 4, 5]
 * transform([1, 2, 3, '--discard-prev', 4, 5]) => [1, 2, 4, 5]
 *
 */
export default function transform(arr) {
  if (!(arr instanceof Array)) {
    throw new Error("'arr' parameter must be an instance of the Array!");
  }

  let transformedArr = [...arr];

  for (let i = 0; i < transformedArr.length; i++) {
    const item = transformedArr[i];

    switch (item) {
      case '--discard-next':
        if (transformedArr[i + 2] === '--discard-prev') {
          transformedArr.splice(i, 3);
        } else if (transformedArr[i + 2] === '--double-prev') {
          transformedArr.splice(i, 3);
        } else if (transformedArr[i + 1]) {
          transformedArr.splice(i, 2);
        } else {
          transformedArr.splice(i, 1);
        }
        break;

      case '--discard-prev':
        if (transformedArr[i - 1]) {
          transformedArr.splice(i - 1, 2);
        } else {
          transformedArr.splice(i, 1);
        }
        break;

      case '--double-next':
        if (transformedArr[i + 2] === '--discard-prev') {
          transformedArr.splice(i, 3, transformedArr[i + 1]);
        } else if (transformedArr[i + 2] === '--double-prev') {
          transformedArr.splice(i, 3, transformedArr[i + 1], transformedArr[i + 1], transformedArr[i + 1]);
        } else if (transformedArr[i + 1]) {
          transformedArr.splice(i, 1, transformedArr[i + 1]);
        } else {
          transformedArr.splice(i, 1);
        }
        break;

      case '--double-prev':
        if (transformedArr[i - 1]) {
          transformedArr.splice(i, 1, transformedArr[i - 1]);
        } else {
          transformedArr.splice(i, 1);
        }
        break;

      default:
        break;
    }
  }

  return transformedArr;
}

