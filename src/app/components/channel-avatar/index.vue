<template>
    <div class="d-flex">
        <div class="catalog-avatar mr-3 mr-md-4">
            <avatar :src="'/images/channels/'+channel.telegramId+'/'+channel.photoId+'.jpg'"
                    :circle="true" />
        </div>
        <div class="text-left">
            <router-link v-if="channel && user"
                         :to="{name:channel.userId === user.userId ? 'channels:update' : 'channels:show' ,params:{username:channel.username}}">
                <b class="channel-title">{{channel.title}}</b>
            </router-link>
            <br>
            <span class="channel-category">{{channel.category || 'Без категории'}}</span>
        </div>
    </div>
</template>
<script type="text/javascript">
import avatar from '@components/avatar';
export default {
    components: {
        avatar
    },
    props: ['channel', 'user'],
    data() {
        return {};
    }
};
</script>