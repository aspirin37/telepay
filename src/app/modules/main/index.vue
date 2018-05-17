<template>
  <div class="container_full container_main">
    <div class="container py-3 px-0">
      <div class="mw-500 mx-auto">
        <div class="logo mb-4" v-once v-html="Logo"></div>
        <h2 class="text-center text-white mb-4">
          Удобный сервис для ведения вашего бизнеса в Telegram
        </h2>
        <ul class="list-unstyled">
          <li class="mb-1">
            <i class="fa fa-paper-plane mr-2 text-gold" aria-hidden="true"></i>
            <span class="text-translucent">Открытый каталог с каналами</span>
          </li>
          <li class="mb-1">
            <i class="fa fa-paper-plane mr-2 text-gold" aria-hidden="true"></i>
            <span class="text-translucent">Разная тематика для привлечения различной аудитории</span>
          </li>
          <li class="mb-1">
            <i class="fa fa-paper-plane mr-2 text-gold" aria-hidden="true"></i>
            <span class="text-translucent">Самая верная статистика каналов</span>
          </li>
          <li class="mb-1">
            <i class="fa fa-paper-plane mr-2 text-gold" aria-hidden="true"></i>
            <span class="text-translucent">Удобный конструктор для создания рекламы</span>
          </li>
          <li class="mb-1">
            <i class="fa fa-paper-plane mr-2 text-gold" aria-hidden="true"></i>
            <span class="text-translucent">Выгодные условия для владельцев каналов</span>
          </li>
        </ul>
        <div class="text-center">
          <router-link :to="{ name: 'registration' }" class="btn text-dark bg-gold rounded-half"><strong>Регистрация</strong></router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '@assets/logo.svg';
export default {
  data() {
    return {
      Logo
    }
  }
}
</script>

<style lang="css">
</style>
