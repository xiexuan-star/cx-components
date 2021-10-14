import { LABOR_ID } from '@/constant';
import { thList } from '@/views/setting/laborCostSetting/config';

// 比较属性
function compareProp(item: AnyObject, obj: AnyObject, thObj: AnyObject, name = 'compareProp') {
  if (thObj.array) {
    return (
      obj[thObj[name]] &&
      (item[thObj.model] as number[]).some(v => [obj[thObj[name]], -1].includes(v))
    );
  } else if (thObj.selectProp) {
    if (thObj[name] === 'actualSpecUnit')
      return [obj[thObj[name]], -1].includes(item[thObj.selectProp]);
    return obj[thObj[name]] && [obj[thObj[name]], -1].includes(item[thObj.selectProp]);
  }
  return true;
}

// 比较区间
function compareRange(item: AnyObject, thObj: AnyObject, num: number) {
  return item[thObj.model[0].prop] <= num && item[thObj.model[1].prop] >= num;
}

/**
 * @param obj
 * @param configList
 * @param ruleList 规则列表
 * @param {string} name 比较名称
 * @description
 */
export function dealWorderAccessory(
  obj: AnyObject,
  configList: any[],
  ruleList: AllocateStoneIndexView['workerAccessoryRuleList'],
  name = 'compareProp'
) {
  let enableList: number[] = [];
  if (configList.length && typeof configList[0] === 'number') {
    enableList = configList;
  } else {
    enableList = configList.filter(v => v.enable).map(v => v.id);
  }
  const list = thList.filter(item => enableList.includes(item.id));
  const findObj = ruleList.find(item => {
    return !list.some(thObj => {
      const flag = compareProp(item, obj, thObj, name);
      if (flag) {
        if (thObj.id === LABOR_ID.STONE_SPEC) {
          if (typeof obj.weight === 'number') {
            obj.actualSpecValue = obj.actualSpecValue.toString();
          }
          const num = +obj.actualSpecValue
            .split('x')
            .reduce((p: number, c: string) => p * +c, 1)
            .toPrecision(15);

          return !compareRange(item, thObj, num);
        }
        if (thObj.id === LABOR_ID.STONE_WEIGHT) {
          const num = +(obj.weight / obj.num).toPrecision(15);
          return !compareRange(item, thObj, num);
        }
      } else {
        return true;
      }
    });
  });
  if (findObj) {
    obj.commissionPrice = findObj.price;
    return findObj.price;
  }
}
