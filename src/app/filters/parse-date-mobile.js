export default function parseDateMobile( date ) {
    return moment( date ).format( 'DD.MM.YY в HH:mm' );
}
