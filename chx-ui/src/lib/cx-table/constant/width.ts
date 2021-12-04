function includeArr(arr: string[]) {
  return (label: string) => arr.some(item => label?.includes(item));
}

function equal(target: string) {
  return (label: string) => label === target;
}

export const CxTableWidthMap = new Map<string,
  { width: number; rule: (label: string) => boolean; static?: boolean; important?: boolean }>([
  ['序号', { width: 60, rule: equal('序号'), static: true }],
  // special
  ['金', { width: 140, rule: equal('金Au (g)') }],
  ['收藏', { width: 100, rule: label => label?.includes('收藏'), static: true }],

  ['手寸', { width: 80, rule: equal('手寸') }],
  ['导入', { width: 255, rule: equal('失败原因') }],
  ['cc不给号', { width: 250, rule: label => ['石号', '证书号'].includes(label) }],
  ['名称', { width: 180, rule: equal('名称') }],
  ['款型', { width: 80, rule: equal('款型') }],
  ['刻字', { width: 180, rule: equal('刻字') }],
  ['计价方式', { width: 200, rule: equal('计价方式') }],
  ['下单', { width: 180, rule: includeArr(['责任方', '维修内容']) }],
  ['石单价(元/ct或元/颗)', { width: 180, rule: equal('石单价(元/ct或元/颗)'), important: true }],
  ['业务类型', { width: 240, rule: equal('业务类型') }],
  ['结料材质', { width: 100, rule: equal('结料材质') }],
  ['计量单位', { width: 100, rule: equal('计量单位') }],
  ['款型', { width: 100, rule: equal('款型') }],
  ['颜色', { width: 130, rule: equal('颜色') }],
  ['净度', { width: 90, rule: equal('净度') }],
  ['形状', { width: 130, rule: equal('形状') }],
  ['特殊工艺', { width: 180, rule: equal('特殊工艺') }],
  ['规格', { width: 120, rule: equal('规格') }],
  ['品名', { width: 180, rule: equal('品名') }],
  ['订单编号', { width: 140, rule: equal('订单编号') }],
  ['客来石编号', { width: 180, rule: equal('客来石编号') }],
  ['生产单号', { width: 120, rule: label => ['生产单号', '销售单号'].includes(label) }],
  ['选择', { width: 60, rule: equal('选择'), static: true }],
  ['货号', { width: 60, rule: equal('货号'), static: true }],
  ['空', { width: 50, rule: equal('') }],
  ['时间', { width: 140, rule: includeArr(['时间', '日期']) }],
  ['姓名', { width: 110, rule: includeArr(['提交人', '审核人', '客户名', '工人']) }],
  [
    '商户类',
    {
      width: 240,

      rule: label => {
        return (
          (['采购单位', '销售对象', '结算对象', '业务对象'].includes(label) ||
           includeArr(['商户', '供应商'])(label)) &&
          !label?.includes('单号')
        );
      }
    }
  ],
  ['仓位', { width: 100, rule: label => ['调入仓', '调出仓'].includes(label) }],
  [
    '手输单号',
    { width: 140, rule: label => ['关联业务单号', '商户单号', '关联订单'].includes(label) }
  ],
  ['批号', { width: 130, rule: label => label?.includes('批号') }],
  ['纯度', { width: 100, rule: label => label?.includes('纯度') }],
  ['重量', { width: 100, rule: includeArr(['重量', '(g)', '（ct）']) }],
  ['金额', { width: 120, rule: includeArr(['金额', '元', '价']) }],
  [
    '数量',
    {
      width: 80,
      rule: label =>
        includeArr(['数'])(label) ||
        [
          '已指派',
          '已完成',
          '当前未完成',
          '未生产',
          '分件',
          '手镶',
          '执模',
          '抛光',
          '维修抛光',
          '微镶',
          '抛镶口',
          '维修执模'
        ].includes(label)
    }
  ],
  ['率', { width: 120, rule: includeArr(['率', '损耗']) }],
  ['备注', { width: 180, rule: label => label?.includes('备注') }],
  ['状态', { width: 100, rule: label => label?.includes('状态'), static: true }],
  ['图片', { width: 80, rule: label => label?.includes('图') && label !== '审图', static: true }],
  ['操作', { width: 100, rule: equal('操作'), static: true }],
  ['默认', { width: 120, rule: () => true }]
]);
