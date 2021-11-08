import { FormConfigAdaptor as adaptor } from './adaptor';

import { dataInitPlugin } from './plugins';

adaptor.use(dataInitPlugin);

export const FormConfigAdaptor = adaptor;
