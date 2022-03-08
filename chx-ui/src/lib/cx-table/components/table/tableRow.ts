import {
  computed,
  createVNode,
  defineComponent,
  inject,
  PropType,
  Ref,
  ref,
  watchEffect
} from 'vue';
import { PATCH_FLAG } from '../../constant';
import { CxTableBaseObj } from '../../types';

export default defineComponent({
  name: 'CxTableRow',
  props: {
    rowData: { type: Object as PropType<AnyObject>, default: () => ({}) },
    rowIndex: { type: Number, default: -1 },
    activedRow: { type: Array as PropType<number[]>, default: () => [] },
    sum: { type: Boolean, default: false },
    rowid: { type: [String, Number], default: '' }
  },
  setup(props, { slots }) {
    const selectConfig = inject<AnyObject>('selectConfig', { selectItem: [] });
    const radioValue = inject<Ref<number>>('radioValue', ref(-1));
    const CxTable = inject<CxTableBaseObj>('CxTable')!;

    const isHover = ref(false);
    watchEffect(() => {
      isHover.value = props.rowid === CxTable.hoveringRowid;
    });

    const isActive = ref(false);
    watchEffect(() => {
      isActive.value =
        selectConfig.selectItem?.[props.rowIndex] ||
        radioValue.value === props.rowIndex ||
        props.activedRow?.includes(props.rowIndex);
    });

    const trAttrs = computed(() => {
      const result: AnyObject = { rowid: props.rowid, class: [] };

      if (isActive.value) {
        result.class.push('is-active');
      }
      if (isHover.value) {
        result.class.push('cx-table__row__hover');
      }
      return result;
    });

    return () => {
      return createVNode('tr', trAttrs.value, slots, PATCH_FLAG.PROPS | PATCH_FLAG.CLASS, [
        'rowid'
      ]);
    };
  }
});
