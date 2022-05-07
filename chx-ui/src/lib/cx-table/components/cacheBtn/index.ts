import * as R from 'ramda';
import {
  Component, createBlock, createCommentVNode, createVNode, defineComponent, Fragment, inject, openBlock,
  PropType, provide, ref, watch
} from 'vue';
import { PATCH_FLAG } from '../../constant';
import { useCxTable } from '../../hooks';
import { CxTableDynamicColumn, CxTablePropType, TableDataVisitor } from '../../types';
import CacheListBtn from './cacheListBtn.vue';
import { INJECT_BADGE_KEY } from './constant';

import SetCacheBtn from './setCacheBtn';

const renderTeleBtn = (comp: Component, props) => {
  return createVNode(
    comp,
    props,
    null,
    PATCH_FLAG.FULL_PROPS,
  );
};

const cacheBtn = defineComponent({
  name:'CacheBtn',
  props: {
    setCacheBtn: { type: String },
    cacheListBtn: { type: String },
    dynamicColumn: { type: Array as PropType<CxTableDynamicColumn[]>, required: true },
    tableDataVisitor: { type: Object as PropType<TableDataVisitor>, required: true }
  },
  setup(props) {
    const context = useCxTable().getContext();
    const rootProp = inject<CxTablePropType>('rootProp')!;
    const getDefaultRequestInstance = (() =>
      R.path(['dynamicCacheContext', 'requestInstance', 'default'], context)) as () => any;
    const badgeApi = '/draft/manager/draft/orderNumber';
    const badgeMap = ref<Record<'notCommitNum' | 'rejectNum' | 'revokeNum', number>>({
      notCommitNum: 0,
      rejectNum: 0,
      revokeNum: 0
    });
    provide(INJECT_BADGE_KEY, badgeMap);

    async function doUpdateBadge() {
      const instance = getDefaultRequestInstance();
      if (!instance) return;
      return instance.get.call(instance, badgeApi, rootProp.dynamic).then(res => {
        Object.assign(badgeMap.value, res.data);
        return res;
      });
    }

    watch(() => rootProp.dynamic, () => {
      const dynamic = rootProp.dynamic;
      if (!dynamic) return;
      if (!dynamic.modelType || !dynamic.businessType || !dynamic.moduleType || !dynamic.priceType) {
        return;
      }
      doUpdateBadge();
    }, { immediate: true });

    return () => {
      return (openBlock(),
        createBlock(Fragment, null, [
          props.setCacheBtn
            ? renderTeleBtn(SetCacheBtn, {
              dynamicColumn: props.dynamicColumn,
              tableDataVisitor: props.tableDataVisitor,
              onBadgeUpdate: doUpdateBadge,
              badgeUpdate: doUpdateBadge
            })
            : createCommentVNode('v-if_set_cache_btn', true),
          props.cacheListBtn
            ? renderTeleBtn(CacheListBtn, {
              onBadgeUpdate: doUpdateBadge
            })
            : createCommentVNode('v-if_cache_list_btn', true)
        ]));
    };
  }
});

export default cacheBtn;
