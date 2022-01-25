import { defineComponent, h, PropType, VNode } from 'vue';
import { isObject } from 'chx-utils';
import { CxEllipsis } from '..';

export default defineComponent({
  name: 'CxDescriptionRow',
  props: {
    row: { type: Array as PropType<VNode[]>, required: true },
    size: String,
    renderWidth: { type: Number, required: true },
    columnNum: { type: Number, required: true }
  },
  setup(props) {
    const getVNodeProp = (node: VNode, prop: string): any => {
      return Reflect.get(node.props ?? {}, prop) ?? (node.type as any)?.props?.[prop]?.default;
    };
    const flattenChildren = <T>(nodes: T[], key = 'children') => {
      return nodes.reduce((res, item: any) => {
        if (typeof item === 'object') {
          if (Array.isArray(item)) {
            res.push(...flattenChildren(item));
          } else if (Array.isArray(item[key])) {
            res.push(...flattenChildren(item[key] as T[], key));
          } else if (item[key]) {
            res.push(item[key]);
          }
        } else {
          res.push(item);
        }
        return res;
      }, [] as T[]);
    };
    const withContainer = (type: string, width: string, children: any[]) => {
      return [
        h(
          'div',
          { style: { width, margin: 0 } },
          (() => {
            switch (type) {
              case 'custom':
                return children;
              default:
                return h(CxEllipsis, {
                  style: { width },
                  content: flattenChildren(children).join()
                });
            }
          })()
        )
      ];
    };
    const getSlot = (node: VNode, width: string, slotName: string, tagName: string) => {
      if (isObject(node.children) && (node.children as Record<string, Func<any>>)[slotName]) {
        return h(
          'div',
          { style: { width }, class: tagName },
          withContainer(node.props?.type, width, [
            (node.children as Record<string, Func<any>>)[slotName]()
          ])
        );
      }
      return null;
    };
    return () => {
      let colspanStat = 0;
      return h(
        'div',
        { class: 'tr' },
        props.row.reduce((res, node, index, arr) => {
          const ratio = getVNodeProp(node, 'ratio');
          const thWidth = props.renderWidth * (1 - ratio);
          const label = getSlot(node, thWidth + 'px', 'label', 'th');
          if (label) {
            res.push(label);
          } else if (node.props?.label) {
            res.push(
              h(
                'div',
                { style: { width: thWidth + 'px' }, class: 'th' },
                withContainer(getVNodeProp(node, 'type'), thWidth - (props.size === 'large' ? 16 : 8) + 'px', [node.props.label])
              )
            );
          }
          const span = +getVNodeProp(node, 'span') || 1;
          let colspan = span > 1 ? (span - 1) * 2 + 1 : 1;
          let tdWidth = span * props.renderWidth - thWidth;
          colspanStat += span;
          if (index === arr.length - 1) {
            const diff = props.columnNum - colspanStat;
            colspan += diff * 2;
            tdWidth += diff * props.renderWidth;
          }

          const defaultSlot =
            getSlot(node, tdWidth + 'px', 'default', 'td') ??
            h('div', { style: { width: tdWidth + 'px' }, class: 'td' });
          defaultSlot.props = Object.assign({}, defaultSlot.props, { colspan });
          res.push(defaultSlot);
          return res;
        }, [] as VNode[])
      );
    };
  }
});
