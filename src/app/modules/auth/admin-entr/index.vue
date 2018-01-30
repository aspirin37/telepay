<template>
  <div>
  </div>
</template>
<script>
import LS from '@utils/local_storage';
import { UserService } from '@services/api'

export default Vue.extend( {
  created() {
    if ( this.$route && this.$route.query.t ) {
      Vue.http.headers.common[ 'X-API-TOKEN' ] = this.$route.query.t;
      LS.set( 'auth_key', this.$route.query.t );
      UserService.getUser()
        .then( ( res ) => {
          if ( res ) {
            if ( res && res.roles === 'customer' ) {
              this.$store.commit( 'SET_USER', res );
              this.$router.push( {
                name: 'intents:list'
              } )
            } else if ( res && res.roles === 'user' ) {
              this.$store.commit( 'SET_USER', res );
              this.$router.push( {
                name: 'profile'
              } )
            } else {
              this.$notifystr.danger( 'Ошибка входа!', 'Профиль не является профилем клиента' )
              this.$store.commit( 'CLEAR_USER' );
              LS.clear();
            }
          }
        } )
    }
  },
} )
</script>
