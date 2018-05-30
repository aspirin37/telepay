<template src="./index.html"></template>
<script>
import { mapState, mapActions } from 'vuex';
import { ChannelApi, PostApi, CatalogApi, PostTemplateApi } from '@services/api';
import channelList from '@components/channel-list';
import postPreview from '@components/post-preview';
import postInput from '@components/post-input';
import dateInput from '@components/date-input';
import collapse from '@components/collapse';
import { clone } from '@utils/clone';
import WebStorage from '@utils/storage';
import paymentModal from '@mixins/payment-modal';

export default {
    components: {
        postPreview,
        channelList,
        dateInput,
        postInput,
        collapse
    },
    data() {
        return {
            channels: [],
            postData: {
                text: 'Текст...',
                buttons: [],
                images: []
            },
            postTemplates: [],
            postTime: moment()
                .add(1, 'hour')
                .format('HH:mm'),
            errors: { time: false }
        };
    },
    mixins: [paymentModal],
    watch: {
        'post.postTemplateId': function(val) {
            if (val) this.watchPostTemplateId(val);
        },
        'post.publishAt': function() {
            this.watchPostTime();
        },
        postTime() {
            this.watchPostTime();
        },
        postData(val) {
            this.watchPostData();
        }
    },
    created() {
        this.$store.commit('CHANGE_STATE', { key: 'is_advert', value: true });
        if (
            this.post &&
            (this.post.text !== this.postData.text ||
                (this.post.buttons && this.post.buttons.length) ||
                (this.post.images && this.post.images.length))
        ) {
            this.postData = {
                text: this.post.text,
                buttons: this.post.buttons,
                images: this.post.images
            };
        }

        this.getChannels();
        this.getPostTemplates();
    },
    destroyed() {
        if (this.post) this.savePost(this.post);
    },
    computed: {
        ...mapState({
            configs: 'configs',
            user: 'user',
            selectedChannels: 'selectedChannels',
            post: 'savedPost'
        }),
        selectedTimeFrameIds() {
            return this.selectedChannels.reduce((sum, ch) => {
                let selectedTimeFrameIds = ch.timeFrame.reduce((sumTimeFrames, timeFrame) => {
                    if (timeFrame.selected) sumTimeFrames.push(timeFrame.timeFrameId);
                    return sumTimeFrames;
                }, []);
                if (selectedTimeFrameIds.length) {
                    return sum.concat(selectedTimeFrameIds);
                }
                return sum;
            }, []);
        },
        channelsToAdd() {
            if (this.channels.length) {
                if (!this.post.publishAt) {
                    this.post.publishAt = moment();
                }
                return this.channels.reduce((sum, ch) => {
                    if (this.selectedChannels.find(sCh => sCh.channelId === ch.channelId)) {
                        return sum;
                    }

                    let filteredTimeFrames = ch.timeFrame.filter(tf => tf.weekDay === moment(this.post.publishAt).weekday() + 1);

                    if (filteredTimeFrames.length) {
                        let copy = clone(ch);
                        copy.timeFrame = filteredTimeFrames;
                        sum.push(copy);
                    }

                    return sum;
                }, []);
            } else {
                return [];
            }
        },
        totalPrice() {
            return this.selectedChannels.reduce((sum, el) => {
                return sum + el.timeFrame.reduce((ofSum, tf) => ofSum + (tf.selected ? tf.priceWithCommission : 0), 0);
            }, 0);
        }
    },

    methods: {
        ...mapActions({
            savePost: 'SAVE_POST',
            dropSavedPost: 'DROP_SAVED_POST',
            saveSelectedChannels: 'SAVE_SELECTED_CHANNELS',
            dropSelectedChannels: 'DROP_SELECTED_CHANNELS'
        }),
        async getChannels() {
            if (!this.post.publishAt) {
                this.post.publishAt = moment();
            }
            let { items, total } = await CatalogApi.filter({
                weekDay: moment(this.post.publishAt).weekday() + 1
            });

            this.channels = items.map(item => {
                if (item.categoryItem && item.categoryItem[0]) item.category = item.categoryItem[0].category.name;
                return item;
            });
            if (this.post.timeFrameId && this.post.timeFrameId.length) {
                let selectedChannels = this.channels.filter(ch => {
                    let selectedTf = ch.timeFrame.find(tf => this.post.timeFrameId.includes(tf.timeFrameId));
                    if (selectedTf) {
                        ch.selected = true;
                        selectedTf.selected = true;
                    }

                    return selectedTf;
                });
                this.$store.commit('CHANGE_STATE', { key: 'selectedChannels', value: selectedChannels });
            }
        },
        async getPostTemplates() {
            let { items } = await PostTemplateApi.list({ limit: 1000 });
            this.postTemplates = items;
            if (this.post.postTemplateId) {
                this.watchPostTemplateId(this.post.postTemplateId);
            }
        },
        watchPostTime() {
            let timeArr = this.postTime.split(':');
            let postTime = moment(this.post.publishAt)
                .set('hour', timeArr[0])
                .set('minute', timeArr[1])
                .set('second', 0);
            this.errors.time = moment() > postTime;
        },
        watchPostTemplateId(val) {
            if (val && typeof val === 'string') {
                let template = this.postTemplates.find(pt => pt.postTemplateId === val);
                if (!template) return;

                this.savedPostData = clone(this.postData);
                Vue.set(this, 'postData', {
                    text: template.text,
                    buttons: typeof template.buttons === 'string' ? JSON.parse(template.buttons) : template.buttons,
                    images: typeof template.images === 'string' ? JSON.parse(template.images) : template.images
                });
            } else {
                this.postData = clone(this.savedPostData);
            }
            this.watchPostData();
        },
        watchPostData() {
            if (this.postData && this.post) {
                let { text, images, buttons } = this.postData;
                this.post.text = text;
                this.post.images = images;
                this.post.buttons = buttons;
            }
        },

        createPost(isTemplate) {
            let timeArr = this.postTime.split(':');
            if (
                moment() >
                moment()
                .set('hour', timeArr[0])
                .set('minute', timeArr[1])
                .set('second', 0)
            ) {
                this.$refs.timeInput.focus();
                return;
            }
            let { buttons, images, publishAt, text, postTemplateId } = this.post;

            let data = {
                timeFrameId: this.selectedTimeFrameIds,
                publishAt: moment(publishAt)
                    .utc(4)
                    .set('hour', timeArr[0])
                    .set('minute', timeArr[1])
                    .toISOString(),
                isTemplate
            };

            if (postTemplateId) {
                data.postTemplateId = postTemplateId;
            } else {
                data.buttons = JSON.stringify(buttons);
                data.images = images && images.map(im => im.file);
                data.text = text.replace(/↵/g, '\n');
            }

            let formData = this.getFormData(new FormData(), data);

            PostApi.create(formData).then(() => {
                this.dropSavedPost();
                if (!isTemplate) {
                    this.dropSelectedChannels();
                    this.$store.commit('CHANGE_STATE', { key: 'user.balance.current', value: this.user.balance.current - this.totalPrice });
                }
                this.$router.push({ name: 'posts:list' });
            });
        },
        getFormData(formData, data, previousKey) {
            if (data instanceof Object) {
                Object.keys(data).forEach(key => {
                    const value = data[key];
                    if (value instanceof Object && !Array.isArray(value)) {
                        return this.getFormData(formData, value, key);
                    }
                    if (previousKey) {
                        key = `${previousKey}[${key}]`;
                    }
                    if (Array.isArray(value)) {
                        value.forEach(val => {
                            formData.append(`${key}[]`, val);
                        });
                    } else {
                        formData.append(key, value);
                    }
                });
            }
            return formData;
        },
        // async saveTemplate() {
        //     await PostTemplateApi.save({
        //         text: this.post.text,
        //         images: this.post.images,
        //         buttons: this.post.buttons,
        //     })
        // },
        dropTemplate() {
            this.post.postTemplateId = '';
            this.post.text = 'Текст...';
            this.post.buttons = [];
            this.post.images = [];
            this.postData.text = 'Текст...';
            this.postData.buttons = [];
            this.postData.images = [];
        },
        async openCatalogPopup() {
            let self = this;
            let vm = new Vue({
                components: {
                    channelList
                },
                router: this.$router,

                data: {
                    channels: clone(self.channelsToAdd),
                    user: clone(self.user)
                },
                computed: {
                    selected() {
                        return this.channels.filter(ch => ch.selected);
                    }
                },
                template: '<channel-list :user="user" :channels="channels"></channel-list>'
            });

            let swalOut = await swal({
                html: '<div id="modalMounter"></div>',
                width: '100%',
                animation: false,
                customClass: 'fade-in',
                showCancelButton: false,
                buttonsStyling: false,
                confirmButtonClass: 'btn btn-success',
                confirmButtonText: 'Добавить',
                onOpen() {
                    vm.$mount('#modalMounter');
                },
                onClose() {
                    vm.$destroy();
                }
            });
            if (swalOut && !swalOut.dismiss) {
                self.saveSelectedChannels(self.selectedChannels.concat(vm.selected));
            }
        }
    }
};
</script>