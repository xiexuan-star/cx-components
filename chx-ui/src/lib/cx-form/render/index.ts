import { createBlock, createCommentVNode, createVNode, Fragment, openBlock} from 'vue'
import { AnyObject } from '../../../types'
import { isFunction } from '../../../utils'
import { PatchFlags } from '../../../constant/enum'

class CxFormRender {
  renderComp(attrs: AnyObject, slots: AnyObject, Comp?: any) {
    return (
      openBlock(),
      createBlock(Fragment, null, [
        Comp
          ? isFunction(Comp)
            ? (function () {
                const nodes = Comp(attrs)
                // nodes?.forEach?.((node: any) => {
                //   !node.props && Reflect.set(node, 'props', {});
                //   Object.assign(node?.props, attrs);
                //   node.PatchFlags = PatchFlags.FULL_PROPS;
                // });
                return nodes
              })()
            : createVNode(Comp, attrs, slots, PatchFlags.FULL_PROPS)
          : createCommentVNode('v-if_component', true),
      ])
    )
  }
}

export const cxFormRender = (function () {
  let _instance: null | CxFormRender = null
  return function () {
    if (!_instance) {
      _instance = new CxFormRender()
    }
    return _instance as CxFormRender
  }
})()
