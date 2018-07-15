<template>
    <div>
        <div class="d-flex">
            <div>
                <h1 class="mb-1 d-flex justify-content-between align-items-baseline">{{ text }}</h1>
                <a :href="'tg://resolve?domain='+link"
                   v-if="link && $mq != 'sm'">Открыть в телеграм</a>
            </div>
            <h1 class="ml-auto">
                <small @click="$router.go(-1)"
                       class="pointer">
                    <i class="fa fa-lg fa-chevron-left d-none d-md-inline"></i>
                    <i class="fa fa-lg fa-angle-left d-inline d-md-none"
                       style="vertical-align: -8%"></i> Назад</small>
            </h1>
        </div>
    </div>
</template>
<script type="text/javascript">
export default {
    props: ['text', 'link'],
    data() {
        return {};
    }
};
</script>