<template lang="html">
    <div class="d-flex py-3 channel w-100">
        <div class="col-1 d-flex justify-content-around align-items-center"
            v-if="showFirstCol">
            <norm-checkbox v-model="data.selected" />
            <i class="fa fa-star"
                :class="{ active: data.like }"
                aria-hidden="true"></i>
        </div>
        <div class="col-3 d-flex">
            <avatar src="http://hash-cloud.ru/tg/avatars/dcfab7c4ed53275d1aae77f4743068.jpg"
                :circle="true" />
            <div class="col-9">
                <p class="m-0 font-weight-500 text-medium-font">{{ data.title }}</p>
                <p class="m-0"><a :href="'https://t.me/'+data.username" target="_blank" rel="noopener nofollow norefferer">@{{ data.username }}</a></p>
            </div>
        </div>
        <div class="col-3 d-flex align-items-center">
            {{ data.description }}
        </div>
        <div class="col-2 d-flex align-items-center font-weight-500 text-medium-font">
            {{ data.subscriberCount | cutSum }}
        </div>
        <div class="col-2 d-flex align-items-center font-weight-500 text-medium-font">
            <!-- {{ data.avgViews *100/ data.subscribersCount }}% -->
            42%
        </div>
        <div class="col-1 d-flex justify-content-around align-items-center"
            v-if="showLastCol">
            <router-link :to="{name:'channels:create'}" class="text-nowrap text-secondary">
            <i class="fa fa-pencil"
                aria-hidden="true"></i>
                Редактировать
                </router-link>
        </div>
    </div>
</template>

<script>
import avatar from '@components/avatar';
import normCheckbox from '@components/checkbox';
export default {
  components: {
    avatar,
    normCheckbox
  },
  data() {
    return {
      zalupa: 2
    };
  },
  props: {
    data: {
      type: Object
    },
    showFirstCol: {
      type: Boolean,
      default: true
    },
    showLastCol: {
      type: Boolean,
      default: false
    }
  }
};
</script>
