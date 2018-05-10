<template src="./index.html"></template>
<script>
import {
    mapState
} from 'vuex';
import {
    ChannelApi,
    PostApi,
    CatalogApi
} from '@services/api';
import channelList from '@components/channel-list';
import postPreview from '@components/post-preview';
import postInput from '@components/post-input';
import dateInput from '@components/date-input';
import {
    clone
} from '@utils/clone';

export default {
    components: {
        postPreview,
        channelList,
        dateInput,
        postInput
    },
    data() {
        return {
            channels: [],
            selectedChannels: this.$route.params.selected || [],
            postData: {
                text: 'Текст...',
                buttons: [],
                images: []
            },
            postTime: '',
            post: {
                text: '',
                buttons: [],
                images: [],
                timeFrameId: [],
                postTemplateId: '',
                channel: 'Название канала',
                publishAt: this.$route.params.date || null
            }
        };
    },
    watch: {
        postData(val) {
            if (val) {
                let {
                    text,
                    images,
                    buttons
                } = val;
                this.post.text = text;
                this.post.images = images;
                this.post.buttons = buttons;
            }
        }
    },
    created() {
        this.getChannels();
        if (this.selectedChannels && this.selectedChannels.length && !this.$route.params.date) {
            this.post.publishAt = moment().weekday(this.selectedChannels[0].timeFrame[0].weekDay);
        }
    },
    computed: {
        dateConfig() {
            return this.$store.state.configs.date;
        },
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

                    let filteredTimeFrames = ch.timeFrame.filter(timeFrame => {
                        return timeFrame.weekDay === this.post.publishAt.weekday() + 1;
                    });

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
                return sum + el.timeFrame.reduce((ofSum, timeFrame) => ofSum + (timeFrame.selected ? timeFrame.price : 0), 0);
            }, 0);
        }
    },

    methods: {
        createPostOrder() {
            let {
                buttons,
                images,
                publishAt,
                text
            } = this.post;
            let timeArr = this.postTime.split(':');

            let data = this.getFormData(new FormData(), {
                buttons: JSON.stringify(buttons),
                images: images.map(im => im.file),
                timeFrameId: this.selectedTimeFrameIds,
                publishAt: moment(publishAt)
                    .utc(4).set('hour', timeArr[0]).set('minute', timeArr[1]).toISOString(),
                text
            });
            PostApi.create(data).then(() => {
                this.$router.push({
                    name: 'posts:list'
                });
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
        saveTemplate() {},
        async openCatalogPopup() {
            let self = this;
            let vm = new Vue({
                components: {
                    channelList
                },
                router: this.$router,
                data: {
                    channels: self.channelsToAdd,
                    user: clone(self.$store.state.user)
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
                self.selectedChannels = self.selectedChannels.concat(vm.selected);
            }
        },
        async getChannels() {
            if (!this.post.publishAt) {
                this.post.publishAt = moment();
            }
            let {
                items,
                total
            } = await CatalogApi.filter({
                weekDay: this.post.publishAt.weekday() + 1
            });
            this.channels = items.map(item => item.channelInfo);
        }
    }
};
</script>