export default function(text, maxLength = 30, arrayMethod = true) {
    if (!text || typeof text !== 'string' || text.length <= maxLength) return text;
    if (arrayMethod) {
        let arr = text.split(' ');
        return arr.slice(0, Math.ceil(maxLength / 10)).join(' ') + '...';
    } else {
        return text.slice(0, maxLength) + '...';
    }
}
