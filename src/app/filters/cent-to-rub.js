export default function (cents, fixDigits = 0) {
    if(typeof cents !== 'number') return cents + ' ₽';
    return Math.round(cents / 100, fixDigits) + ' ₽';
}
