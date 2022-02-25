import ChxUI from 'chx-ui';
import 'chx-ui/dist/chx-ui.esm.css';

export default async ({
                        Vue
                      }) => {
  if (typeof process === 'undefined') {
    Vue.use(ChxUI);
  }
}
