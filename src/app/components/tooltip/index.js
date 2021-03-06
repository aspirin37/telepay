class Tooltip {
    constructor(el, binding) {
        if(!binding.value) return;
        this.container = document.getElementById('v-tooltips-container');
        this.options = typeof binding.value !== 'string' ? binding.value : { template: binding.value };


        if(!this.container) {
            this.container = this._classedEl('v-tooltips-container');
            this.container.id = 'v-tooltips-container';
        }

        this.t = this._classedEl('tooltip bs-tooltip-top fade');
        this.t.id = `tooltip-${ Math.round( Math.random() * 1e8 )}`;
        el.tooltipId = this.t.id;

        let arrow = this._classedEl('arrow');
        this.t.append(arrow);

        let inner = this._classedEl('tooltip-inner');
        inner.innerHTML = this.options.template;
        this.t.append(inner);

        this.container.append(this.t);

        document.body.append(this.container);

        let tooltipRect = this.t.getBoundingClientRect();
        arrow.style.left = ((tooltipRect.width / 2) - 6.4) + 'px';

        el.onmouseover = this.mouseover.bind(this);
        el.onmouseout = this.mouseout.bind(this);

        this.t.addEventListener('transitionend', () => {
            if(!this.isShown) {
                // this.container.style.position = 'static'
                this.t.style.top = '-1000px';
                this.t.style.left = '-1000px';
            }
        });
    }
    mouseover(ev) {
        clearTimeout(this.outTimeout);
        clearTimeout(this.inTimeout);
        let rect = ev.target.getBoundingClientRect();
        let tooltipRectDyn = this.t.getBoundingClientRect();
        this.t.style.top = (rect.top - tooltipRectDyn.height - 6 + window.pageYOffset) + 'px';
        this.t.style.left = (((rect.left + rect.right) / 2 - tooltipRectDyn.width / 2) + window.pageXOffset) + 'px';
        this.inTimeout = setTimeout(() => {
            this.isShown = true;
            this.t.classList.add('show');
        }, this.options.delayIn || 0);
    }
    mouseout() {
        clearTimeout(this.outTimeout);
        clearTimeout(this.inTimeout);
        this.outTimeout = setTimeout(() => {
            this.t.classList.remove('show');
            this.isShown = false;
        }, this.options.delayOut || 0);
    }

    _classedEl(className, tag = 'div') {
        let el = document.createElement(tag);
        el.className = className;
        return el;
    }
    static destroy(el) {
        if(el && el.tooltipId) {
            let elToRemove = document.getElementById(el.tooltipId);
            if(elToRemove) elToRemove.remove();
        }
    }
}

export default {
    inserted(el, binding) {
        return new Tooltip(el, binding);
    },
    update(el, binding) {
        Tooltip.destroy(el);
        return new Tooltip(el, binding);
    },
    unbind(el) {
        Tooltip.destroy(el);
    }
};
