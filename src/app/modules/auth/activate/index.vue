<template>
  <div>
    <p class="text-center">Подтверждаем email...</p>
  </div>
</template>
<script>
import { UserService } from '@services/api';

export default Vue.extend( {
  created() {
    this.$store.commit( 'TOGGLE_LOADING', true );
    this.activate()
  },
  methods: {
    goToLogin() {
      this.$store.commit( 'TOGGLE_LOADING', false );
      this.$router.push( { name: 'login' } )
    },
    activate() {
      if ( this.$route.query.code ) {
        UserService.confirmEmail( this.$route.query.code )
          .then( ( res ) => {
            this.$store.commit( 'SET_USER', res )
            this.$router.push( { name: 'profile' } )

            this.$notifystr.success( 'Успешно!', 'Email подтвержден' )
          } )
          .catch( ( err ) => {
            console.error( err )
            this.goToLogin()
          } )
      } else {
        this.goToLogin()
        this.$notifystr.danger( 'Ошибка!', 'Отсутствует код подтверждения' )
      }
    }
  },
} );
</script>
