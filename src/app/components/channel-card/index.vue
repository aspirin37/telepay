<template>
  <div>
    <div class="flex-table"
         v-if="innerChannels.length">
      <div class="header-row">
        <div class="col-3">Канал</div>
        <div class="col">Описание</div>
        <div class="col">Подписчиков</div>
        <div class="col">
          <span v-tooltip="'% активной аудитории'">ER</span>
        </div>
        <div class="col-5 d-flex justify-content-between">
          <span>Условия</span>
          <span>Цена</span>
          <span>Выбрать</span>
        </div>
      </div>
      <div class="body-row"
           :key="ch.channelId"
           v-for="ch in innerChannels">
        <div class="col-3">
          <div class="form-row">
            <div class="col-3">
              <avatar :src="'/images/channels/'+ch.telegramId+'/'+ch.photoId+'.jpg'"
                      :circle="true" />
            </div>
            <div class="col-9 pl-4">
              <router-link v-if="ch&&user"
                           :to="{name:ch.userId === user.userId?'channels:update':'channels:show',params:{id:ch.channelId}}">
                <b>{{ch.title}}</b>
              </router-link>
              <br>{{ch.categories || 'Без категории'}}</div>
          </div>
        </div>
        <div class="col">{{(ch.description || '-') | cutLongStr}}</div>
        <div class="col h4 m-0">
          <!-- <telestat-link :channel="ch.username" v-if="ch.subscriberCount>=300" :text="$options.filters.cutSum(ch.subscriberCount)" /> -->
          <span>{{ch.subscriberCount | cutSum(2)}}</span>
        </div>
        <div class="col fa-lg">{{ch.engagementRate}}%</div>
        <div class="col-5 h4 m-0">
          <transition-group name="fade-out"
                            mode="out-in">
            <div class="form-row"
                 v-if="!ch.showAllTimeFrames && ch.cheapestTimeFrame"
                 :key="ch.cheapestTimeFrame.timeFrameId">
              <div class="col-5">{{timeFrameDates(ch.cheapestTimeFrame,true)}} - {{ch.cheapestTimeFrame.inTopHours}}/{{ch.cheapestTimeFrame.inFeedHours}}</div>
              <div class="col-5">{{ ch.cheapestTimeFrame.price | centToRub}}
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
              <div class="col-5">{{ timeFrame.price | centToRub}}
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
        </div>
      </div>
    </div>
    <div class="p-4 text-center"
         v-else>
      <h4>{{placeholder}}</h4>
    </div>
  </div>
</template>
<script>
// import { ChannelApi } from '@services/api';
import avatar from '@components/avatar';
import onOff from 'vue-on-off';
// import { clone } from '@utils/clone';
export default {
  components: { avatar, normCheckbox },
  props: {
    channel: {
      type: Object,
      default () {
        return {};
      }
    },
    placeholderTitle: {
      type: String,
      default: 'Название канала'
    },
    placeholderDesc: {
      type: String,
      default: 'Описание канала'
    }
  }
};
</script>