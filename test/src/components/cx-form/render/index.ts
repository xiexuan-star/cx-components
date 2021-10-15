import { PATCH_FLAG } from '@/constant/patchFlag'
import { omit } from '@/utils'
import { isFunction } from '@/utils/is'
import { createBlock, createCommentVNode, createVNode, Fragment, openBlock } from 'vue'

const renderComp = (attrs: AnyObject, slots: AnyObject, Comp?: any) => {
  return (
    openBlock(),
    createBlock(Fragment, null, [
      Comp
        ? isFunction(Comp)
          ? (function () {
              const prop = attrs.__prop
              return Comp(Object.assign(omit(attrs, ['__closable', '__emit', '__prop']), { prop }))
            })()
          : createVNode(Comp, omit(attrs, ['__closable', '__emit', '__prop']), slots, PATCH_FLAG.FULL_PROPS)
        : createCommentVNode('v-if_component', true),
    ])
  )
}

class CxFormRender {
  renderComp = renderComp
  renderControl(attrs: AnyObject, slots: AnyObject, Comp?: any) {
    return createVNode('div', { style: { position: 'relative' } }, [
      renderComp(attrs, slots, Comp),
      attrs.__closable
        ? createVNode('i', {
            style: { position: 'absolute', right: '-3px', top: '-3px' },
            class: 'iconfont icon-shanchu',
            onClick: () => {
              isFunction(attrs.__emit) && attrs.__emit('close', attrs.__prop)
            },
          })
        : createCommentVNode('v-if_closable', true),
    ])
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
