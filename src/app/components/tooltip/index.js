export default {
    inserted(el, binding) {
        let tooltip = document.createElement('div');
        tooltip.classList.add('tooltip');
        tooltip.id = `tooltip-${(Math.random()*1e8).toFixed()}`;
        tooltip.innerHTML = binding.value;
        document.body.append(tooltip);

        el.onmouseover = function() {};
    },
};