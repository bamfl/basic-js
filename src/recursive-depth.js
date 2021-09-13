import { NotImplementedError } from '../extensions/index.js';

/**
 * Implement class DepthCalculator with method calculateDepth
 * that calculates deoth of nested array
 * 
 * @example
 * 
 * const depthCalc = new DepthCalculator();
 * depthCalc.calculateDepth([1, 2, 3, 4, 5]) => 1
 * depthCalc.calculateDepth([1, 2, 3, [4, 5]]) => 2
 * depthCalc.calculateDepth([[[]]]) => 3
 *
 */
export default class DepthCalculator {
	calculateDepth(arr) {
		let counter = 1;

		for (let i = 0; i < arr.length; i++) {
			let item = arr[i];

			if (typeof item === 'object') {
				counter +=	this.calculateDepth(arr.flat());
				break;
			}
		}

    return counter;
  }
}
