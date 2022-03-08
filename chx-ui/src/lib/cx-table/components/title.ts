import { createVNode, defineComponent, inject, renderSlot, Slots } from 'vue';

export default defineComponent({
  name: 'CxTableTitle',
  props: { title: { type: String } },
  setup(props) {
    const rootSlots = inject('rootSlots') as Slots;
    return () => {
      if (rootSlots.tableTitle) {
        return renderSlot(rootSlots, 'tableTitle');
      } else if (props.title) {
        return createVNode('div', { class: 'cx_secondary_title cx_ptb_16' }, props.title);
      }
      return null;
    };
  }
});
