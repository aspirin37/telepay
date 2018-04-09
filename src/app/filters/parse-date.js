export default function parseDate(date, short) {
    if (date) return moment(date).format(short ? 'DD MMM YYYY' : 'DD MMM YYYY HH:mm:ss');
    return 'Не определено';
}