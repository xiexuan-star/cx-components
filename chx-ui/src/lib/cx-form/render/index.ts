import { createBlock, createCommentVNode, createVNode, Fragment, openBlock } from 'vue'
import { AnyObject } from '../../../types'
import { isFunction } from '../../../utils'
import { PatchFlags } from '../../../constant/enum'

const renderComp = (attrs: AnyObject, slots: AnyObject, Comp?: any) => {
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

class CxFormRender {
  renderComp = renderComp
  renderControl(attrs: AnyObject, slots: AnyObject, Comp?: any) {
    return (
      openBlock(),
      createBlock(Fragment, null, [
        createVNode('div', { style: { position: 'relative' } }, [
          renderComp(attrs, slots, Comp),
          attrs.closable
            ? createVNode('i', {
                style: { position: 'absolute', right: '-3px', top: '-3px' },
                class: 'closable-icon',
                onClick: () => {
                  isFunction(attrs.emit) && attrs.emit('close', attrs.prop)
                },
              })
            : createCommentVNode('v-if_closable', true),
        ]),
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
