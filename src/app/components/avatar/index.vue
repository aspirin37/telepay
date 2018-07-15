<template>
    <div :style="wrapStyles"
         ref="wrap"
         class="avatar">
        <img v-show="!error"
             :src="src"
             :alt="alt"
             class="h-100 w-100"
             @error="handle" />
        <h1 :style="mountStyles"
            v-show="error"
            class="m-0 text-white">?</h1>
    </div>
</template>
<script>
export default {
    data() {
        return {
            error: false,
            width: 0
        };
    },
    props: {
        src: {
            type: String
        },
        alt: { type: String, default: 'Image' + Math.round(Math.random() * 1e6) },
        circle: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        src(val) {
            this.error = false;
        }
    },
    methods: {
        handle(event) {
            event.preventDefault();
            this.error = true;
            this.$emit('error', true);
        },
        calcWidth() {
            this.$nextTick(() => {
                this.width = this.$refs.wrap.getBoundingClientRect().width;
            });
        }
    },
    mounted() {
        this.calcWidth();
        window.addEventListener('resize', this.calcWidth);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.calcWidth);
    },
    computed: {
        wrapStyles() {
            return {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: this.width + 'px',
                backgroundColor: this.error ? 'rgb(108, 117, 125)' : 'transparent',
                borderRadius: this.circle ? '50%' : 0,
                overflow: 'hidden'
            };
        },
        mountStyles() {
            return {
                fontSize: this.width * 0.55 + 'px'
            };
        }
    }
};
</script>
<style lang="scss"
       scoped>
@import '~bootstrap/scss/bootstrap.scss';
.avatar {
    width: 40px;
    height: 40px;

    @include media-breakpoint-up(md) {
        width: auto;
        height: auto;
        min-width: 50px;
        min-height: 50px;
        padding: 0;
    }
}
</style>
