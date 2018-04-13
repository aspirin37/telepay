<template>
  <div>
    <div class="flex-table" v-if="innerChannels.length">
      <div class="header-row">
        <div class="col-3">Канал</div>
        <div class="col">Описание</div>
        <div class="col">Подписчиков</div>
        <div class="col">ER</div>
        <div class="col-5 d-flex justify-content-between">
          <span>Условия</span>
          <span>Цена</span>
          <span>Выбрать</span>
        </div>
      </div>
      <div class="body-row" :key="ch.channelId" v-for="ch in innerChannels">
        <div class="col-3">
          <div class="form-row">
            <div class="col-3">
              <avatar :src="'/images/channels/'+ch.telegramId+'_'+ch.photoId+'.jpg'" :circle="true" />
            </div>
            <div class="col-9 pl-4">
              <router-link :to="{name:ch.userId === user.userId?'channels:update':'channels:show',params:{id:ch.channelId}}">
                <b>{{ch.title}}</b>
              </router-link>
              <br>{{ch.categories || 'Без категории'}}</div>
          </div>
        </div>
        <div class="col">{{(ch.description || '-') | cutLongStr}}</div>
        <div class="col h4 m-0">
          <telestat-link :channel="ch.username" v-if="ch.subscriberCount>=300" :text="$options.filters.cutSum(ch.subscriberCount)" />
          <span v-else>{{ch.subscriberCount}}</span>
        </div>

        <div class="col fa-lg">{{ch.engagementRate}}%</div>
        <div class="col-5 h4 m-0">
          <transition name="fade-out" mode="out-in">
            <div class="form-row" v-if="!ch.showAllOffers && ch.cheapestOffer">
              <div class="col-5">{{offerTime(ch.cheapestOffer,true)}} - {{ch.cheapestOffer.inTopHours}}/{{ch.cheapestOffer.inFeedHours}}</div>
              <div class="col-5">{{ ch.cheapestOffer.price | centToRub}}
                <i class="fa fa-lg fa-fix mx-1 pointer fa-chevron-down" v-if="ch.channelOffer.length > 1" @click="ch.showAllOffers = true"></i>
              </div>
              <div class="col-2 text-center">
                <norm-checkbox v-model="ch.selected" @change="toggleChannel(ch)" />
              </div>
            </div>
          </transition>
          <transition-group name="fade-out">
            <div class="form-row" v-if="ch.showAllOffers" :key="offer.channelOfferId" v-for="offer in ch.channelOffer">
              <div class="col-5">{{offerTime(offer,true)}} - {{offer.inTopHours}}/{{offer.inFeedHours}}</div>
              <div class="col-5">{{ offer.price | centToRub}}
                <i class="fa fa-lg fa-fix mx-1 pointer fa-chevron-up" v-if="offer === ch.cheapestOffer" @click="ch.showAllOffers=false"></i>
              </div>
              <div class="col-2 text-center">
                <norm-checkbox v-model="offer.selected" @change="toggleOffer(ch,offer)" />
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>

    <div class="p-4 text-center" v-else>
      <h4>{{placeholder}}</h4>
    </div>
  </div>
</template>
<script>
import { ChannelApi } from '@services/api';
import avatar from '@components/avatar';
import normCheckbox from '@components/checkbox';
import { clone } from '@utils/clone';
export default Vue.extend({
  components: { avatar, normCheckbox },
  props: {
    channels: {
      type: Array,
      default() {
        return [];
      }
    },
    filter: {
      type: Object,
      default() {
        return {};
      }
    },
    placeholder: {
      type: String,
      default: 'Нет подходящих предложений'
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    selectedChannels() {
      return this.innerChannels.reduce((sum, ch) => {
        let selectedOffers = ch.channelOffer.some(offer => offer.selected);
        if (selectedOffers) {
          ch.selected = true;
          sum.push(ch);
        } else {
          ch.selected = false;
        }
        return sum;
      }, []);
    },
    innerChannels() {
      return this.channels.reduce((sum, ch) => {
        if (ch.showAllOffers === undefined) Vue.set(ch, 'showAllOffers', false);
        if (ch.selected === undefined) Vue.set(ch, 'selected', false);
        if (ch.channelOffer && ch.channelOffer.length) {
          ch.cheapestOffer = ChannelApi.getCheapestOffer(ch);
          ch.channelOffer.forEach(offer => {
            if (offer.selected === undefined) Vue.set(offer, 'selected', false);
          });
          sum.push(ch);
        }
        return sum;
      }, []);
    }
  },
  methods: {
    offerTime: ChannelApi.offerTime,
    toggleChannel(ch) {
      if (!ch.selected) {
        ch.channelOffer.forEach(offer => {
          offer.selected = false;
        });
      } else {
        ch.cheapestOffer.selected = true;
      }
    },
    toggleOffer(ch, offer) {
      if (offer.selected) {
        ch.selected = true;
      } else if (!ch.channelOffer.some(of => of.selected)) {
        ch.selected = false;
      }
    }
  }
});
</script>
