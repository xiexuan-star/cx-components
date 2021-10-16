import { FormConfigAdaptor as adaptor } from './adaptor';

import { dataInitPlugin } from './plugins/index';

adaptor.use(dataInitPlugin);

export const FormConfigAdaptor = adaptor;
