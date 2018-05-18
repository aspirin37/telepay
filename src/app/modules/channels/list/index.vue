<template src="./index.html"></template>
<script>
import {
    mapState
} from 'vuex';
import {
    ChannelApi,
    PostApi
} from '@services/api';
import channelStatuses from '@utils/channel-statuses';
import postStatuses from '@utils/post-statuses';
import {
    clone
} from '@utils/clone';
import avatar from '@components/avatar';
import postList from '@components/post-list';
import postPreview from '@components/post-preview';

export default {
    components: {
        avatar,
        postList,
        postPreview
    },
    data() {
        return {
            channels: [],
            channelStatuses,
            postStatuses
        };
    },
    created() {
        this.getList();
    },
    computed: {
        ...mapState(['user']),
        now() {
            return moment().toDate();
        }
    },
    methods: {
        timeFrameDates: ChannelApi.timeFrameDates,
        mapToPreview(post) {
            let parsedBtns, parsedImgs;
            try {
                parsedBtns = JSON.parse(post.postTemplate.buttons);
            } catch (e) {
                parsedBtns = [post.postTemplate.buttons];
            }
            try {
                parsedImgs = JSON.parse(post.postTemplate.images);
            } catch (e) {
                parsedImgs = [post.postTemplate.images];
            }
            return {
                channel: post.timeFrame.channel.title,
                text: post.postTemplate.text,
                images: parsedImgs,
                buttons: parsedBtns,
                time: this.timeFrameDates(post.timeFrame, true),
                publishAt: post.publishAt * 1000
            };
        },

        togglePreview(ch, post = {}, bool = !post.showPreview) {
            setTimeout(() => {
                ch.postOrders.forEach(el => {
                    if (el.postOrderId !== post.postOrderId) el.showPreview = false;
                });
                post.showPreview = bool;
            });
        },
        async getList() {
            let {
                items,
                total
            } = await ChannelApi.list();

            items.forEach(ch => {
                if (ch.timeFrame) {
                    ch.postOrders = ch.timeFrame.reduce((sum, timeFrame) => {
                        if (timeFrame.postOrder) {
                            let timeFrameCopy = clone(timeFrame);
                            let channelCopy = clone(ch);
                            delete timeFrameCopy.postOrder;
                            delete channelCopy.timeFrame;
                            timeFrameCopy.channel = channelCopy;
                            timeFrame.postOrder.forEach(post => {
                                post.timeFrame = timeFrameCopy;
                                post.showPreview = false;
                            });
                            sum.push(...timeFrame.postOrder);
                        }
                        return sum;
                    }, []);
                }
                ch.cheapestTimeFrame = ChannelApi.getCheapestTimeFrame(ch);
                ch.showOrders = false;
            });

            this.channels = items;
        },
        async approvePost(post) {
            let swalOut = await swal({
                type: 'success',
                title: 'Подтвердить размещение поста?',
                confirmButtonText: 'Да, подтвердить!'
            });

            if (swalOut && !swalOut.dismiss && swalOut.value) {
                console.log(post.timeFrame);
                await PostApi.updateStatus(post.postOrderId, {
                    status: 0,
                    timeFrameId: post.timeFrame.timeFrameId
                });
                this.getList();
            }
        },
        async declinePost(post) {
            let swalOut = await swal({
                type: 'error',
                title: 'Отклонить размещение поста?',
                confirmButtonText: 'Да, отклонить!'
            });

            if (swalOut && !swalOut.dismiss && swalOut.value) {
                await PostApi.updateStatus(post.postOrderId, {
                    status: 1,
                    timeFrameId: post.timeFrame.timeFrameId
                });
                this.getList();
            }
        },
        toggleOrders(ch) {
            if (ch.postOrders && ch.postOrders.length) {
                ch.showOrders = !ch.showOrders;
            }
        }
    }
};
</script>