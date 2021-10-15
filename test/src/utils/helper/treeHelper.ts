interface TreeHelperConfig {
  id: string;
  children: string;
}

const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children'
};

const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config);

export function findPath<T = any>(
  tree: any,
  func: Func<any>,
  config: Partial<TreeHelperConfig> = {}
) {
  config = getConfig(config);
  const path: T[] = [];
  const list = [...tree];
  const visitedSet = new Set();
  const { children } = config;

  while (list.length) {
    const node = list[0];
    if (visitedSet.has(node)) {
      path.pop();
      list.shift();
    } else {
      visitedSet.add(node);
      node[children!] && list.unshift(...node[children!]);
      path.push(node);
      if (func(node)) {
        return path;
      }
    }
  }

  return null;
}

/**
 * 树结构扁平化
 */
export function treeToList<T = any>(tree: any, config: Partial<TreeHelperConfig> = {}): T {
  const { children } = getConfig(config);
  const result: any = [...tree];
  for (let i = 0; i < result.length; i++) {
    if (!result[i][children]) continue;
    result.splice(i + 1, 0, ...result[i][children]);
    // delete result[i].children
  }

  return result;
}

/**
 * 树结构数据的filter
 */
export function treeFilter<T = any>(
  tree: T[],
  func: (n: T) => boolean,
  config: Partial<TreeHelperConfig> = {}
) {
  config = getConfig(config);
  const children = config.children as string;

  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node }))
      .filter(node => {
        node[children] = node[children] && listFilter(node[children]);
        return func(node) || (node[children] && node[children].length);
      });
  }

  return listFilter(tree);
}

export function treeMapEach(
  data: any,
  {
    children = 'children',
    childrenKey,
    conversion
  }: { children?: string; childrenKey?: string; conversion: Func<any> }
) {
  const haveChildren = Array.isArray(data[children]) && data[children].length > 0;
  const conversionData = conversion(data) || {};
  if (haveChildren) {
    return {
      ...conversionData,
      [childrenKey ?? children]: data[children].map((i: any) =>
        treeMapEach(i, { children, conversion })
      )
    };
  } else {
    return {
      ...conversionData
    };
  }
}

/**
 * 提取树结构的指定结构
 */
export function treeMap(
  treeData: any[],
  opt: { children?: string; childrenKey?: string; conversion: Func<any> }
) {
  return treeData.map(item => treeMapEach(item, opt));
}
