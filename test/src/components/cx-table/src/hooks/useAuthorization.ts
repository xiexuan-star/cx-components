import { CxTableBaseObj, CxTablePropType } from '../types';

export const useColumnValidity = ($CxTable: CxTableBaseObj) => {
  const { flatColumns } = $CxTable;
  const keys = new Map();
  flatColumns.forEach(item => {
    const key = item.label + item.prop;
    if (keys.get(key)) {
      throw new Error(`config中传递了重复的key: label=>${item.label},prop=>${item.prop}`);
    } else {
      keys.set(key, 1);
    }
  });
};

export const useRowDataValidity = (props: CxTablePropType) => {
  const { tableData } = props;
  const rows = new Map();
  tableData?.forEach(rowData => {
    if (rows.get(rowData)) {
      throw new Error(`tableData中传递了重复的rowData引用:${JSON.stringify(rowData)}`);
    } else {
      rows.set(rowData, 1);
    }
  });
};
