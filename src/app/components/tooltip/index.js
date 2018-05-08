import Tooltip from 'tooltip.js';

export default {
    inserted(el, binding) {
        let tt = new Tooltip(el, { placement: 'top', title: 'Top' });
        console.log(el, binding, tt);
        tt.show();
    },
};