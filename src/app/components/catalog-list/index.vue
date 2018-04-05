<template>
  <div class="flex-table">
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
            <avatar :src="'images/'+ch.telegramId+'_'+ch.photoId+'.jpg'" :circle="true" />
          </div>
          <div class="col-9">
            <b>{{ch.title}}</b>
            <br>{{ch.categories || 'Без категории'}}</div>
        </div>
      </div>
      <div class="col">{{ch.description | cutLongStr}}</div>
      <div class="col h4 m-0">
        <telestat-link :channel="ch.username" v-if="ch.subscriberCount>=300" :text="$options.filters.cutSum(ch.subscriberCount)" />
        <span v-else>{{ch.subscriberCount}}</span>
      </div>

      <div class="col">{{ch.engagementRate}}%</div>
      <div class="col-5 h4 m-0">
        <div class="form-row">
          <div class="col-5">{{offerTime(ch.cheapestOffer)}} - {{ch.cheapestOffer.inTopHours}}/{{ch.cheapestOffer.inFeedHours}}</div>
          <div class="col-5">{{ ch.cheapestOffer.price | centToRub}}
            <i class="fa fa-lg fa-fix mx-1 pointer" v-if="ch.channelOffer.length > 1" :class="ch.showAllOffers?'fa-chevron-up':'fa-chevron-down'" @click="ch.showAllOffers=!ch.showAllOffers"></i>
          </div>
          <div class="col-2 text-center">
            <norm-checkbox v-model="ch.cheapestOffer.selected" />
          </div>
        </div>
        <transition-group name="fade">
          <div class="form-row" v-if="ch.showAllOffers && offer.channelOfferId !== ch.cheapestOffer.channelOfferId" :key="offer.channelOfferId" v-for="offer in ch.channelOffer">
            <div class="col-5">{{offerTime(offer)}} - {{offer.inTopHours}}/{{offer.inFeedHours}}</div>
            <div class="col-5">{{ offer.price | centToRub}}</div>
            <div class="col-2 text-center">
              <norm-checkbox v-model="offer.selected" />
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>
<script>
import { ChannelApi } from '@services/api';
export default Vue.extend({
  data() {
    return {
      innerChannels: []
    };
  },
  props: {
    channels: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    selectedChannels() {
      return this.innerChannels.reduce((sum, ch) => {
        let selectedOffers = ch.channelOffer.filter(offer => offer.selected);
        if (selectedOffers.length) {
          ch.channelOffer = selectedOffers;
          sum.push(ch);
        }
        return sum;
      }, []);
    }
  },
  created() {
    this.innerChannels = this.channels.map(item => {
      Vue.set(item.channelInfo, 'showAllOffers', false);
      item.channelInfo.channelOffer = item.channelInfo.channelOffer.filter(offer => offer.weekDay - 1 === moment(params.date).weekday());

      item.channelInfo.cheapestOffer = ChannelApi.getCheapestOffer(item.channelInfo);
      item.channelInfo.channelOffer.forEach(offer => {
        Vue.set(offer, 'selected', false);
      });

      return item.channelInfo;
    });
  },
  methods: {
    offerTime: ChannelApi.offerTime,
    selectChannel(ch) {
      ch.cheapestOffer.selected = !ch.cheapestOffer.selected;
    }
  }
});
</script>
