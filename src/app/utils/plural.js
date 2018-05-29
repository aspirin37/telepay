export default function plural(base, endings) {
    return function result(count) {
        let strCount = count + '';
        let plur = '';
        if(count > 10 && count < 20) return `${base}${endings[0]}`;
        switch(strCount[strCount.length - 1]) {
            case '0':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                plur = endings[0];
                break;
            case '1':
                plur = endings[1];
                break;
            case '2':
            case '3':
            case '4':
                plur = endings[2];
                break;
        }
        return `${base}${plur}`;
    };
}
