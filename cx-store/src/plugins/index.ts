import { AnyObject, CxStorePlugin } from '../statistic/types';
import { cloneDeep, isObject, JSONInvoker } from '../utils';

export const storeFilter: CxStorePlugin = {
  onSet: payload => {
    if (isObject(payload)) {
      const result = cloneDeep(payload);

      const omit = (obj: AnyObject) => {
        Object.entries(obj).forEach(([key, val]) => {
          if (val == undefined) {
            Reflect.deleteProperty(obj, key);
          } else if (isObject(val)) {
            omit(val);
          }
        });
      };

      omit(result);
      return result;
    }

    return payload;
  },
  onGet: JSONInvoker
};
