import { CxRendererRegister, CxTableItemControlType, useCxTable } from '../../../../../../src';
import {
  renderInputNode,
  renderDefaultNode,
  renderRadioNode,
  renderDefaultCheckboxNode,
  renderTimeNode,
  renderSelectNode,
  renderSearchNode,
  renderNumberInput,
  renderDefaultSelectNode,
  renderDelOperationNode,
  renderExpandSwitch,
  renderTagNode,
  renderSpecificationNode,
  renderIndexNode,
  renderSwitchNode,
} from './cx-table-renderer';

export const isSilenceNode = (params: any) =>
  (params.ignore || !params.isActived || params.disabled) && !params.force;

function useCxTableDefaultRenderer() {
  const { registCxRenderer } = useCxTable();

  const registerMap: Partial<Record<CxTableItemControlType, CxRendererRegister>> = {
    default: renderDefaultNode,
    note: renderDefaultNode,
    nativeRadio: renderRadioNode,
    expandSwitch: renderExpandSwitch,
    index: params => renderIndexNode(params),
    time: params => renderTimeNode('time', params),
    date: params => renderTimeNode('date', params),
    tag: params => renderTagNode(params, 'tag'),
    status: params => renderTagNode(params, 'status'),
    nativeCheckbox: renderDefaultCheckboxNode,
    switch: {
      render: params => {
        renderSwitchNode(params);
        return params.ignore || params.disabled
          ? renderDefaultSelectNode(params)
          : renderSwitchNode(params);
      }
    },
    input: {
      render: params => {
        return isSilenceNode(params) ? renderDefaultNode(params) : renderInputNode(params);
      },
      active: true
    },
    numberInput: {
      render: params => {
        return isSilenceNode(params) ? renderDefaultNode(params) : renderNumberInput(params);
      },
      active: true
    },
    select: {
      render: params => {
        // 此处需要执行一次select的渲染逻辑,以更新Text值
        const node = renderSelectNode(params);
        return isSilenceNode(params) ? renderDefaultSelectNode(params) : node;
      },
      active: true
    },
    search: {
      render: params => {
        const node = renderSearchNode(params);
        return isSilenceNode(params) ? renderDefaultSelectNode(params) : node;
      },
      active: true
    },
    nativeDelete: params => {
      return params.ignore ? renderDefaultNode(params) : renderDelOperationNode(params);
    },
    specification: {
      render: params => {
        return isSilenceNode(params) ? renderDefaultNode(params) : renderSpecificationNode(params);
      },
      active: true
    },
  };

  Object.entries(registerMap).forEach(([type, payload]) => {
    registCxRenderer({ type, payload });
  });
}

export default useCxTableDefaultRenderer;
