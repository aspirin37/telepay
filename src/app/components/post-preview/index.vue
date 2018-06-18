<template>
    <div class="preview">
        {{post.time}}
        <small class="preview__date">{{ formattedDate }}</small>
        <div class="preview__workarea">
            <p class="preview__body">
                <span class="preview__channel text-primary">
                    <transition name="fade-out"
                                mode="out-in">
                        <span>{{ shownChannelName }}</span>
                    </transition>
                </span>{{ shownChannelName }}
                <span class="preview__message">
                    <div class="preview__images"
                         v-if="post && post.images && post.images.length">
                        <img v-for="(src, i) in post.images"
                             :key="i"
                             class="preview__image"
                             :src="getImageSrc(src)"
                             alt="Image">
                    </div>
                    <div class="preview__text"
                         v-html="replaceMarkdown(post.text)"></div>
                </span>
                <span class="preview__time">{{ post.time }}</span>
            </p>
            <div class="preview__buttons"
                 v-if="post && post.buttons && post.buttons.length">
                <a target="_blank"
                   rel="nofollow noreferrer noopener"
                   v-for="(btn,i) in post.buttons"
                   :key="i"
                   class="preview__button"
                   :href="`${btn[0].url}`">
                    <span class="link-arrow">
                        <svg viewBox="0 0 283.178 283.178">
                            <g>
                                <path d="M254.812,140.713h-20c-4.142,0-7.5,3.358-7.5,7.5v91.186c0,4.84-3.939,8.778-8.779,8.778H43.776
        			c-4.839,0-8.775-3.938-8.775-8.778V64.645c0-4.841,3.936-8.78,8.775-8.78h95.855c4.142,0,7.5-3.358,7.5-7.5v-20
        			c0-4.142-3.358-7.5-7.5-7.5H43.776c-24.138,0-43.775,19.64-43.775,43.78v174.755c0,24.14,19.638,43.778,43.775,43.778h174.756
        			c24.14,0,43.779-19.639,43.779-43.778v-91.186C262.312,144.071,258.954,140.713,254.812,140.713z" />
                                <path d="M275.677,0h-79.553c-4.142,0-7.5,3.358-7.5,7.5v20c0,4.142,3.358,7.5,7.5,7.5h27.304
        			L120.683,137.743c-2.929,2.929-2.929,7.677,0,10.607l14.142,14.143c1.407,1.407,3.314,2.197,5.304,2.197
        			c1.989,0,3.897-0.79,5.303-2.197L248.177,59.748v27.303c0,4.142,3.358,7.5,7.5,7.5h20c4.142,0,7.5-3.358,7.5-7.5V7.5
        			C283.177,3.358,279.819,0,275.677,0z" />
                            </g>
                        </svg>
                    </span>
                    {{ btn[0].text || "Текст кнопки" }}
                </a>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            channelNameIndex: 0,
        }
    },
    props: {
        post: {
            type: Object,
            default () {
                return {};
            }
        },
        selectedChannelNames: {
            type: Array,
            default () { return [] },
            validate(arr) {
                return arr.every(e => typeof e === 'string')
            }
        }
    },
    computed: {
        formattedDate() {
            let date = this.post.publishAt;
            if (/\d{2}\.\d{2}\.\d{4}/.test(date)) {
                date = date.split('.').reverse().join('-');
            }
            let ftd = moment(date).format('MMMM DD');
            return ftd[0].toUpperCase() + ftd.slice(1);
        },
        shownChannelName() {

            return this.selectedChannelNames[this.channelNameIndex] || this.post.channel || 'Название канала';
        }
    },
    created() {
        this.startReplacingNames()
    },
    watch: {
        selectedChannelNames() {
            console.log('changed selectedChannelNames')
            this.startReplacingNames()
        }
    },
    destroyed() {
        clearInterval(this.interval);
    },
    methods: {
        startReplacingNames() {
            clearInterval(this.interval);
            this.channelNameIndex = 0;
            if (this.selectedChannelNames && this.selectedChannelNames.length) {
                console.log('started interval')
                this.interval = setInterval(this.nextName, 5000)
            }
        },
        nextName() {
            if (this.channelNameIndex >= this.selectedChannelNames.length - 1) {
                this.channelNameIndex = 0;
            } else {
                this.channelNameIndex++;
            }
            console.log(this.selectedChannelNames[this.channelNameIndex])
        },
        getImageSrc(src) {
            if (typeof src === 'string') return '/images/posts/' + src;
            return src && src.decoded;
        },
        replaceMarkdown(text) {
            if (!text) return 'Текст поста...'
            text = this.replaceBold(text);
            text = this.replaceItalic(text);
            text = this.replacePre(text);
            text = this.replaceCode(text);
            text = this.replaceHashtags(text);
            text = this.replaceMentions(text);
            text = this.replaceLineBreaks(text);
            text = this.replaceLinks(text);

            return text;
        },
        replaceBold(text) {
            return text.replace(/\*\n?([\s\S]+?)\n?\*/g, (str, match) => `<b>${match}</b>`);
        },
        replaceItalic(text) {
            return text.replace(/\_\n?([\s\S]+?)\n?\_/g, (str, match) => `<i>${match}</i>`);
        },
        replacePre(text) {
            return text.replace(/\`\`\`\n?([\s\S]+?)\n?\`\`\`/g, (str, match) => `<pre>${match}</pre>`);
        },
        replaceCode(text) {
            return text.replace(/\`\n?([\s\S]+?)\n?\`/g, (str, match) => `<code>${match}</code>`);
        },
        replaceLineBreaks(text) {
            return text.replace(/\n/g, () => '<br>');
        },
        replaceHashtags(text) {
            return text.replace(/\n?(#.+?)\b\n?/g, (str, match) => `<span class="preview__link">${match}</span>`);
        },
        replaceMentions(text) {
            return text.replace(/\n?(@.+?)\b\n?/g, (str, match) =>
                `<a href="tg://resolve?domain=${match.slice(1)}" rel="noopener nofollow noreferrer" class="preview__link">${match}</a>`
            );
        },
        replaceLinks(text) {
            return text.replace(/\[(.+?)\]\((https?:\/\/.+?)\)/g, (str, text, link) =>
                `<a class="preview__link" href="${link}" target="_blank" rel="noopener noreferrer nofollow">${text}</a>`);
        },
    }
};
</script>
<style lang="scss">
.w-50 {
    width: 50% !important;
}

.preview {
    position: relative;
    display: flex;
    padding: 50px 0px 15px 20px;
    background-color: rgb(245, 245, 245);
    background-image: url('/assets/preview-bg.jpg');
    background-position: center;
    background-size: contain;
    min-height: 300px;
    align-items: flex-end;
    border-radius: 10px;
    font-family: 'Open Sans', sans-serif !important;
    &__workarea {
        display: flex;
        height: 100%;
        flex-direction: column;
        width: 80%;
    }
    &__channel {
        display: inline-block;
        font-weight: 600;
        color: #1895d3 !important;
    }
    &__body {
        position: relative;
        background-color: #fff;
        border-radius: 5px;
        width: 100%;
        margin: 0;
        padding: 6px 10px;
        word-wrap: break-word;
        box-shadow: 0px 1.5px 0px rgba(0, 0, 0, 0.1);
        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: -9px;
            z-index: 60;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 0 0 10px 15px;
            box-shadow: 0px 1.5px 0px rgba(0, 0, 0, 0.1);
            border-color: transparent transparent #ffffff transparent;
        }
        pre,
        code {
            display: inline;
            color: #4e7491;
            margin: 0;
            padding: 0;
        }
    }
    &__message {
        display: block;
        margin: 0;
        background: transparent;
    }
    &__link {
        color: #1895d3;
        cursor: pointer;
        &:hover {
            text-decoration: underline;
        }
    }
    &__text {
        p {
            line-height: 1.2;
        }
    }
    &__date {
        position: absolute;
        line-height: 1;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.4);
        color: #fff;
        padding: 5px 7px;
        border-radius: 15px;
    }
    &__images {
        margin: 5px -10px;
    }
    &__image {
        width: 100%;
    }
    &__buttons {
        margin-top: 5px;
    }
    &__button {
        position: relative;
        display: block;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        color: rgb(255, 255, 255);
        text-align: center;
        padding: 10px;
        border-radius: 5px;
        transition: 0.1s ease-in-out;
        &:not(:last-child) {
            margin-bottom: 5px;
        }
        &:hover {
            background-color: rgba(0, 0, 0, 0.3);
            color: #fff;
            text-decoration: none;
        }
        .link-arrow {
            position: absolute;
            display: flex;
            top: 5px;
            right: 5px;
            svg {
                fill: #fff;
                height: 10px;
                width: 10px;
            }
        }
    }
    &__time {
        display: block;
        text-align: right;
        font-size: 12px;
        font-weight: 400;
        color: rgb(153, 153, 153);
    }
}
</style>
