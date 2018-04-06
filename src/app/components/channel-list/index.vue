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

        <div class="col fa-lg">{{ch.engagementRate}}%</div>
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

    <div class="p-4 text-center" v-else>
      <h4>Нет подходящих предложений</h4>
    </div>
    <!-- chlist channels {{channels}}
    <br> <br> chlist selectedChannels {{selectedChannels}}
    <br> <br> chlist innerChannels {{innerChannels}} -->
  </div>
</template>
<script>
import { ChannelApi } from '@services/api';
import avatar from '@components/avatar';
import normCheckbox from '@components/checkbox';
import { clone } from '@utils/clone';
export default Vue.extend({
  components: { avatar, normCheckbox },
  data() {
    return {};
  },
  props: {
    value: {
      default() {
        return [];
      }
    },
    channels: {
      type: Array,
      default() {
        return [];
      }
    },
    isAllSelected: {
      type: Boolean,
      default: false
    },
    filter: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  watch: {
    value(val) {
      if (val && val instanceof Array) {
        this.innerChannels = this.value;
      }
    },
    selectedChannels(val) {
      this.$emit('input', val);
    }
  },
  computed: {
    selectedChannels() {
      return this.innerChannels.reduce((sum, ch) => {
        let selectedOffers = ch.channelOffer.filter(offer => offer.selected);
        if (selectedOffers.length) {
          ch = clone(ch);
          ch.channelOffer = selectedOffers;
          sum.push(ch);
        }
        return sum;
      }, []);
    },
    innerChannels: {
      get() {
        return this.channels.reduce((sum, item) => {
          Vue.set(item, 'showAllOffers', false);

          if (item.channelOffer.length) {
            item.cheapestOffer = ChannelApi.getCheapestOffer(item);
            item.channelOffer.forEach(offer => {
              Vue.set(offer, 'selected', this.isAllSelected);
            });
            sum.push(item);
          }
          return sum;
        }, []);
      },
      set(val) {
        return val;
      }
    }
  },
  methods: {
    offerTime: ChannelApi.offerTime,
    selectChannel(ch) {
      ch.cheapestOffer.selected = !ch.cheapestOffer.selected;
    }
  }
});
</script>
