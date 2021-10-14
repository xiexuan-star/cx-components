import { useCxForm } from '../../../../../../src';
import { cxFormRendererMap } from './cx-form-renderer';

export const useCxFormRenderer = () => {
  const { registerRenderer } = useCxForm();
  Object.entries(cxFormRendererMap).forEach(([type, [comp, adaptor]]) => {
    registerRenderer({ comp, type, adaptor });
  });
};
