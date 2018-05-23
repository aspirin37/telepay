<template>
    <div>
        <slot name="trigger">
            <button class="btn btn-primary">{{triggerText}}</button>
        </slot>
    </div>
</template>
<script>
export default Vue.extend({
    data() {
        return {};
    },
    props: {
        triggerText: {

        }
    },
    created() {},
    methods: {}
});
</script>