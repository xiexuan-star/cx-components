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
          const thWidth = 'fit-content';
          const label = getSlot(node, thWidth, 'label', 'th');
          const wrapperChildren = []
          if (label) {
            wrapperChildren.push(label);
          } else if (node.props?.label) {
            wrapperChildren.push(
              h(
                'div',
                { style: { width: thWidth }, class: 'th' },
                withContainer(getVNodeProp(node, 'type'), thWidth, [node.props.label])
              )
            );
          }
          const span = +getVNodeProp(node, 'span') || 1;
          let colspan = span > 1 ? (span - 1) * 2 + 1 : 1;
          let tdWidth = 'fit-content';
          colspanStat += span;

          const defaultSlot =
            getSlot(node, tdWidth, 'default', 'td') ??
            h('div', { style: { width: tdWidth}, class: 'td' });
          defaultSlot.props = Object.assign({}, defaultSlot.props, { colspan });
          wrapperChildren.push(defaultSlot);
          const wrapper = h('section', {style:{width:props.renderWidth+'px'},class:'cx_flex_center'}, wrapperChildren);
          res.push(wrapper);
          return res;
        }, [] as VNode[])
      );
    };
  }
});
