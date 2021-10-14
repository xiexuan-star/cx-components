export enum LogsType {
  DEFAULT = 'default',
  PRIMARY = 'primary',
  SUCCESS = 'success',
  WARNING = 'warning',
  DANGER = 'danger'
}

/**
 * @description 返回这个样式的颜色值
 * @param {String} type 样式名称
 */
function typeColor(type = LogsType.PRIMARY) {
  const colorMap = {
    [LogsType.DEFAULT]: '#f5f5f5',
    [LogsType.PRIMARY]: '409EFFF',
    [LogsType.SUCCESS]: '#67C23A',
    [LogsType.WARNING]: '#E6A23C',
    [LogsType.DANGER]: '#F56C6C'
  };

  return colorMap[type];
}

class Log {
  /**
   * @description 打印一个 [ title | text ] 样式的信息
   * @param {String} title title text
   * @param {String} info info text
   * @param {String} type style
   */
  capsule(title: string, info: any, type = LogsType.PRIMARY) {
    console.log(
      `%c ${title} %c ${info} %c`,
      'background:#35495E; padding: 1px; border-radius: 3px 0 0 3px; color: #fff;',
      `background:${typeColor(type)}; padding: 1px; border-radius: 0 3px 3px 0;  color: #fff;`,
      'background:transparent'
    );
  }
  /**
   * @description 打印彩色文字
   */
  colorful(textArr: { text: any; type: LogsType }[]) {
    console.log(
      `%c${textArr.map(t => t.text || '').join('%c')}`,
      ...textArr.map(t => `color: ${typeColor(t.type)};`)
    );
  }

  text(text: any) {
    this.colorful([{ text, type: LogsType.DEFAULT }]);
  }

  primary(text: any) {
    this.colorful([{ text, type: LogsType.PRIMARY }]);
  }

  success(text: any) {
    this.colorful([{ text, type: LogsType.SUCCESS }]);
  }

  warning(text: any) {
    this.colorful([{ text, type: LogsType.WARNING }]);
  }

  danger(text: any) {
    this.colorful([{ text, type: LogsType.DANGER }]);
  }
}

const log = new Log();

export default log;
