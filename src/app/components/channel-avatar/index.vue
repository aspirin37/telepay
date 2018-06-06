<template>
    <div class="d-flex">
        <div class="catalog-avatar mr-2 mr-md-4">
            <avatar :src="'/images/channels/'+channel.telegramId+'/'+channel.photoId+'.jpg'"
                    :circle="true" />
        </div>
        <div>
            <router-link v-if="channel && user"
                         :to="{name:channel.userId === user.userId ? 'channels:update' : 'channels:show' ,params:{username:channel.username}}">
                <b>{{channel.title}}</b>
            </router-link>
            <br>
            <small clas="text-light">{{channel.category || 'Без категории'}}</small>
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