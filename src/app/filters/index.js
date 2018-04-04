import centToRub from './cent-to-rub';
import cutKilo from './cut-kilo';
import cutSum from './cut-sum';
import parseDate from './parse-date';
import parseLinks from './parse-links';
import cutLongStr from './cut-long-str';
// import mapByCountry from './map-by-country';

Vue.filter('centToRub', centToRub);
Vue.filter('cutKilo', cutKilo);
Vue.filter('cutSum', cutSum);
Vue.filter('parseDate', parseDate);
Vue.filter('parseLinks', parseLinks);
Vue.filter('cutLongStr', cutLongStr);
// Vue.filter('mapByCountry', mapByCountry)
