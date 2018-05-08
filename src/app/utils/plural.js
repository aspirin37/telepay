export default function plural(base, count) {
    let strCount = count + '';
    let plur = '';
    if (count > 10 && count < 20) return `${base}ов`;
    switch (strCount[strCount.length - 1]) {
        case '0':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            plur = 'ов';
            break;
        case '1':
            break;
        case '2':
        case '3':
        case '4':
            plur = 'а';
            break;
    }
    return `${base}${plur}`;
}