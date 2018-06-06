<template>
    <div>
        <mq-layout mq="sm">
            <div class="flex-table" v-if="innerChannels.length">
                <div class="header-row mx-0 px-0 justify-content-between">
                    <div class="w-25 text-center">
                        <i class="fa fa-lg fa-users" aria-hidden="true"></i>
                    </div>
                    <div class="w-25 text-center">ER</div>
                    <div class="w-25 text-center">1/24</div>
                    <div class="w-25 text-center">
                        <i class="fa fa-lg fa-rub"></i>
                    </div>
                </div>
                <div class="body-row" :key="ch.channelId" v-for="ch in innerChannels">
                    <div class="form-row col-12 px-0 mb-3">
                        <div class="w-50 d-flex offset-1">
                            <div class="mr-2" style="width: 40px; height: 40px;">
                                <avatar :src="'/images/channels/'+ch.telegramId+'/'+ch.photoId+'.jpg'" :circle="true" />
                            </div>
                            <div>
                                <router-link v-if="ch&&user" :to="{name:ch.userId === user.userId?'channels:update':'channels:show',params:{username:ch.username}}">
                                    <b>{{ch.title}}</b>
                                </router-link>
                                <br>
                                <small clas="text-light">{{ch.category || 'Без категории'}}</small>
                            </div>
                        </div>
                        <div class="w-25 offset-2 px-0 d-flex align-items-center justify-content-center">
                            <norm-checkbox v-model="ch.selected" v-tooltip="ch.cheapestTimeFrame.postAmount === 0 || ch.disabled?'Все размещения на выбранную дату на канале уже заняты':''" :disabled="ch.cheapestTimeFrame.postAmount === 0 || ch.disabled" @change="toggleChannel(ch)" />
                        </div>
                    </div>
                    <div class="form-row col-12 px-0 justify-content-between">
                        <div class="w-25 text-center">
                            <span>{{ch.subscriberCount | cutSum(1)}}</span>
                        </div>
                        <div class="w-25 text-center">{{ ch.engagementRate | cutSum}}%</div>
                        <div class="w-25 text-center">{{ch.cheapestTimeFrame.inTopHours}}/{{ch.cheapestTimeFrame.inFeedHours||'∞'}}</div>
                        <div class="w-25 text-center">{{ ch.cheapestTimeFrame.priceWithCommission | centToRub}}</div>
                    </div>
                </div>
            </div>
            <div class="p-4 text-center" v-if="!innerChannels.length">
                <h5>{{placeholder}}</h5>
            </div>
        </mq-layout>
        <mq-layout mq="md+">
            <div class="row chips" v-if="innerChannels.length && isChips">
                <div class="col p-1" :key="ch.channelId" v-for="ch in innerChannels">
                    <div class="chip d-flex align-items-center justify-content-between" :class="{selected:ch.selected}">
                        <avatar :src="'/images/channels/'+ch.telegramId+'/'+ch.photoId+'.jpg'" class="float-left w-25 h-25" :circle="true" />
                        <b class="chip-title float-left">
                            {{ch.title}}
                            <br> {{ch.cheapestTimeFrame.priceWithCommission | centToRub}}
                            <br> {{ch.cheapestTimeFrame.inTopHours}}/{{ch.cheapestTimeFrame.inFeedHours||'∞'}}
                        </b>
                        <i class="fa float-right" @click="toggleChannel(ch,true)" :class="ch.selected?'fa-times fa-2x':'fa-repeat fa-lg ml-1'"></i>
                    </div>
                </div>
            </div>
            <div class="flex-table" v-if="innerChannels.length && !isChips">
                <div class="header-row mx-0">
                    <div class="col-3">Канал</div>
                    <div class="col">Размещения</div>
                    <div class="col">Подписано</div>
                    <div class="col">
                        <span v-tooltip="'% активной аудитории'">ER</span>
                    </div>
                    <div class="col">Условия</div>
                    <div class="col">Цена</div>
                    <div class="col">Выбрать</div>
                    <!-- <div class="col-5 d-flex justify-content-between">
                    <span>Условия</span>
                    <span>Цена</span>
                    <span>Выбрать</span>
                </div> -->
                </div>
                <div class="body" :class="{'small-body':smallBody}">
                    <div class="body-row" :class="{'opacity-50':ch.cheapestTimeFrame.postAmount === 0 || ch.disabled}" :key="ch.channelId" v-for="ch in innerChannels">
                        <div class="col-3">
                            <div class="form-row">
                                <div class="col-3">
                                    <avatar :src="'/images/channels/'+ch.telegramId+'/'+ch.photoId+'.jpg'" :circle="true" />
                                </div>
                                <div class="col-9 pl-4">
                                    <router-link v-if="ch&&user" :to="{name:ch.userId === user.userId?'channels:update':'channels:show',params:{username:ch.username}}">
                                        <b>{{ch.title}}</b>
                                    </router-link>
                                    <br>{{ch.category || 'Без категории'}}</div>
                            </div>
                        </div>
                        <div class="col h4 m-0">
                            {{ch.cheapestTimeFrame.postCount-ch.cheapestTimeFrame.postAmount}}/{{ch.cheapestTimeFrame.postCount}}
                        </div>
                        <div class="col h4 m-0">
                            <!-- <telestat-link :channel="ch.username" v-if="ch.subscriberCount>=300" :text="$options.filters.cutSum(ch.subscriberCount)" /> -->
                            <span>{{ch.subscriberCount | cutSum(1)}}</span>
                        </div>
                        <div class="col h4 m-0">{{ ch.engagementRate | cutSum}}%</div>
                        <div class="col h4 m-0">{{ch.cheapestTimeFrame.inTopHours}}/{{ch.cheapestTimeFrame.inFeedHours||'∞'}}</div>
                        <div class="col h4 m-0">{{ ch.cheapestTimeFrame.priceWithCommission | centToRub}}</div>
                        <div class="col h4 m-0">
                            <norm-checkbox v-model="ch.selected" v-tooltip="ch.cheapestTimeFrame.postAmount === 0 || ch.disabled?'Все размещения на выбранную дату на канале уже заняты':''" :disabled="ch.cheapestTimeFrame.postAmount === 0 || ch.disabled" @change="toggleChannel(ch)" />
                        </div>
                        <!-- <div class="col-5 h4 m-0">
                        <transition-group name="fade-out"
                                          mode="out-in">
                            <div class="form-row"
                                 v-if="!ch.showAllTimeFrames && ch.cheapestTimeFrame"
                                 :key="ch.cheapestTimeFrame.timeFrameId">
                                <div class="col-5">{{ch.cheapestTimeFrame.inTopHours}}/{{ch.cheapestTimeFrame.inFeedHours||'∞'}}</div>
                                <div class="col-5">{{ ch.cheapestTimeFrame.priceWithCommission | centToRub}}
                                    <i class="fa fa-lg fa-fix mx-1 pointer fa-chevron-down"
                                       v-if="ch.timeFrame.length > 1"
                                       @click="ch.showAllTimeFrames = true"></i>
                                </div>
                                <div class="col-2 text-center">
                                    <norm-checkbox v-model="ch.selected"
                                                   @change="toggleChannel(ch)" />
                                </div>
                            </div>
                            <div class="form-row"
                                 v-if="ch.showAllTimeFrames"
                                 :key="timeFrame.timeFrameId"
                                 v-for="timeFrame in ch.timeFrame">
                                <div class="col-5">{{ timeFrameDates(timeFrame,true) }} - {{ timeFrame.inTopHours }}/{{ timeFrame.inFeedHours }}</div>
                                <div class="col-5">{{ timeFrame.priceWithCommission | centToRub}}
                                    <i class="fa fa-lg fa-fix mx-1 pointer fa-chevron-up"
                                       v-if="timeFrame === ch.cheapestTimeFrame"
                                       @click="ch.showAllTimeFrames=false"></i>
                                </div>
                                <div class="col-2 text-center">
                                    <norm-checkbox v-model="timeFrame.selected"
                                                   @change="toggleTimeFrame(ch,timeFrame)" />
                                </div>
                            </div>
                        </transition-group>
                    </div> -->
                    </div>
                </div>
            </div>
            <div class="p-4 text-center" v-if="!innerChannels.length">
                <h4>{{placeholder}}</h4>
            </div>
        </mq-layout>
    </div>
</template>
<script>
import { ChannelApi } from '@services/api';
import avatar from '@components/avatar';
import normCheckbox from '@components/checkbox';
import { clone } from '@utils/clone';
export default Vue.extend({
  components: {
    avatar,
    normCheckbox
  },
  props: {
    channels: {
      type: Array,
      default() {
        return [];
      }
    },
    notAvailableTimeFrames: {
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
    user: {
      type: Object,
      default() {
        return {};
      }
    },
    placeholder: {
      type: String,
      default: 'Нет подходящих предложений'
    },
    smallBody: {
      type: Boolean,
      default: false
    },
    isChips: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    selectedChannels() {
      return this.innerChannels.reduce((sum, ch) => {
        let selectedTimeFrames = ch.timeFrame.some(timeFrame => timeFrame.selected);
        if (selectedTimeFrames) {
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
        if (ch.showAllTimeFrames === undefined) Vue.set(ch, 'showAllTimeFrames', false);
        if (ch.selected === undefined) Vue.set(ch, 'selected', false);
        if (ch.timeFrame && ch.timeFrame.length) {
          ch.cheapestTimeFrame = ChannelApi.getCheapestTimeFrame(ch);
          ch.timeFrame.forEach(timeFrame => {
            if (timeFrame.selected === undefined) Vue.set(timeFrame, 'selected', false);
            this.notAvailableTimeFrames.forEach(it => {
              ch.disabled = it == timeFrame.timeFrameId ? true : false;
            });
            if (!this.notAvailableTimeFrames.length) ch.disabled = false;
          });
          sum.push(ch);
        }
        return sum;
      }, []);
    }
  },
  methods: {
    timeFrameDates: ChannelApi.timeFrameDates,
    toggleChannel(ch, changeModel) {
      if (changeModel) ch.selected = !ch.selected;
      if (!ch.selected) {
        ch.timeFrame.forEach(timeFrame => {
          timeFrame.selected = false;
        });
      } else {
        ch.cheapestTimeFrame.selected = true;
      }
      if (this.$store) this.$store.dispatch('SAVE_SELECTED_CHANNELS', this.innerChannels.filter(ch => ch.selected));
    },
    toggleTimeFrame(ch, timeFrame) {
      if (timeFrame.selected) {
        ch.selected = true;
      } else if (!ch.timeFrame.some(of => of.selected)) {
        ch.selected = false;
      }
    }
  }
});
</script>