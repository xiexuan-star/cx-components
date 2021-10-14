import { createVNode, defineComponent } from 'vue';

const script = defineComponent({ name: 'EmptyData' });
const render = () => createVNode('embed', { src: require('../../assets/tableEmpty.svg') });
script.render = render;
export default script;
