/**
 *
 * @param {Number} index
 * @param {Array} arr
 * @return {Number}
 */
export function backgroundIndex(index = 0, arr: number[] = []) {
  if (!arr.length) return index;
  let arrIndex = 0;
  return arr.findIndex(v => {
    if (v <= 0) return true;
    arrIndex += v;
    return index <= arrIndex;
  });
}
