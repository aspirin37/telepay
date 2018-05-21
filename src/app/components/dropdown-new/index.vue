<template>
    <div>
        <slot name="trigger">
            <button class="btn btn-primary"></button>
        </slot>
    </div>
</template>
<script>
export default Vue.extend({
    data() {
        return {};
    },
    props: {},
    created() {},
    methods: {}
});
</script>