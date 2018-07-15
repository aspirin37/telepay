export default function (val, num = 0) {
    if(typeof val !== 'number' && typeof val !== 'string') return val;
    if(typeof val === 'string') val = parseFloat(val);

    if(val < 1e3) {
        return Math.round(val, num);
    } else if(val >= 1e3 && val < 1e6) {
        return Math.round(val / 1e3, num) + 'k';
    } else if(val >= 1e6) {
        return Math.round(val / 1e6, num) + 'M';
    }
}
