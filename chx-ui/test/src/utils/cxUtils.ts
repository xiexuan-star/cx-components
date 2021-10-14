class CxUtils {
  arrInsert<T = any>(target: T[], position: number, ...args: Array<T | T[]>) {
    return target
      .slice(0, position)
      .concat(this.flatten(args) as T[])
      .concat(target.slice(position, Infinity));
  }
  flatten<T>(arr: T) {
    if (!Array.isArray(arr)) return [arr];
    if (arr.length === 0) return arr;
    const result: T[] = [];
    const stack = [arr];
    let currentItem;
    while ((currentItem = stack.shift())) {
      Array.isArray(currentItem) ? stack.push(...currentItem) : result.push(currentItem);
    }
    return result;
  }
  copyInnerText(ele: HTMLElement) {
    const range = document.createRange();
    range.selectNodeContents(ele);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    document.execCommand('copy');
    return ele;
  }
}

export const cxUtils = new CxUtils();
