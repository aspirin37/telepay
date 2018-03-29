<template lang="html">
  <div class="d-flex align-items-center py-3 channel w-100">
    <div class="col-1 d-flex justify-content-around" v-if="showForOwner">
      2
    </div>
    <div class="col-1 d-flex justify-content-around" v-if="!showForOwner">
      <norm-checkbox v-model="selected" @change="changeHandler">
        <i class="fa fa-star" :class="{ active: data.like }" aria-hidden="true"></i>
      </norm-checkbox>
    </div>
    <div class="col-3 d-flex">
      <avatar src="http://hash-cloud.ru/tg/avatars/dcfab7c4ed53275d1aae77f4743068.jpg" :circle="true" />
      <div class="col-9">
        <p class="m-0">
          <router-link class="font-weight-500 text-medium-font" :to="{ name: routeName, params: { id: data.channelId } }">
            {{ data.title }}
          </router-link>
        </p>
        <p class="m-0 font-weight-light text-medium-font">{{ data.category || 'Дефолтная категория' }}</p>
      </div>
    </div>
    <div class="col-2 d-flex font-weight-500 text-medium-font">
      {{ data.description }}
    </div>
    <div class="col-2 d-flex font-weight-500 text-medium-font">
      {{ data.subscriberCount | cutSum }}
    </div>
    <div class="col-1 d-flex font-weight-500 text-medium-font">
      <!-- {{ data.er }}% -->
      0%
    </div>
    <div class="col-1 d-flex font-weight-500 text-medium-font">
      1/24
    </div>
    <div class="col-1 d-flex font-weight-500 text-medium-font">
      <!-- {{ data.price }}₽ -->
      30000₽
    </div>
    <div class="col-1 d-flex justify-content-around" v-if="showForOwner">
      <router-link :to="{ name: 'channel.delete', params: { id: data.channelId } }">
        <i class="fa fa-trash"></i>
      </router-link>
      <router-link :to="{ name: 'channel.edit', params: { id: data.channelId } }">
        <i class="fa fa-pencil"></i>
      </router-link>
    </div>
    <div class="col-1 d-flex justify-content-around" v-if="!showForOwner">
      <norm-checkbox v-model="selected" @change="changeHandler" />
    </div>
  </div>
</template>

<script>
import avatar from '@components/avatar';
import normCheckbox from '@components/checkbox';
export default {
  components: {
    avatar,
    normCheckbox,
  },
  data() {
    return {
      selected: false
    }
  },
  props: {
    data: {
      type: Object
    },
    showForOwner: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    routeName() {
      return this.showForOwner ? 'channel.edit' : 'channel.show';
    }
  },
  methods: {
    changeHandler(e) {
      this.$emit('select-channel', this.data.channelId);
    }
  }
}
</script>
