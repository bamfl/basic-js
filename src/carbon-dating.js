import { NotImplementedError } from '../extensions/index.js';

const MODERN_ACTIVITY = 15;
const HALF_LIFE_PERIOD = 5730;

/**
 * Determine the age of archeological find by using
 * given MODERN_ACTIVITY and HALF_LIFE_PERIOD values
 *
 * @param {String} sampleActivity string representation of current activity
 * @return {Number | Boolean} calculated age in years or false
 * in case of incorrect sampleActivity
 *
 * @example
 *
 * dateSample('1') => 22387
 * dateSample('WOOT!') => false
 *
 */
export default function dateSample(sampleActivity) {
  if (!sampleActivity || typeof sampleActivity !== 'string') {
    return false;
  }

  if (!parseFloat(sampleActivity)) {
    return false;
  }

  const age = Math.ceil((HALF_LIFE_PERIOD * Math.log(MODERN_ACTIVITY / sampleActivity)) / Math.log(2));

  return age > 0 ? age : false;
}
