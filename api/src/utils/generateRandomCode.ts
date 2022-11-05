/**
 * generate a random number
 * @module utils/generateRandomCode
 */

import _ from "lodash";

export default function generateRandomCode(): number {
  return _.random(1000, 9000);
}
