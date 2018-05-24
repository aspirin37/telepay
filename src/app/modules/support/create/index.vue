<template src="./index.html"></template>
<script>
import { SupportApi } from "@services/api";
import StarRating from "vue-star-rating";
import searchInput from "@components/search-input";
import supportTextarea from "@components/support-textarea";
import topics from "@utils/support-topics";

export default Vue.extend({
    components: {
        searchInput,
        supportTextarea,
        StarRating
    },
    watch: {
        selectedTopic() {
            this.validateMessage();
        },
        newMessage() {
            this.validateMessage();
        }
    },
    data() {
        return {
            topics,
            ticketStatus: this.$route.query.status || null,
            ticketId: this.$route.query.ticketId || null,
            rating: 0,
            isRated: false,
            isRatingDisabled: false,
            messages: null,
            topic: null,
            selectedTopic: "",
            newMessage: {
                text: "",
                images: []
            }
        };
    },
    created() {
        if (this.$route.query.ticketId) {
            this.getMessages();
        }
        if (this.$route.query.rating) {
            this.rating = Number(this.$route.query.rating)
            this.isRatingDisabled = true
        }
        if (this.$route.params.topic) {
            this.selectedTopic = this.topics[this.$route.params.topic]
        }
        if (this.$route.params.text) {
            this.newMessage.text = this.$route.params.text
        }
    },
    methods: {
        setRating(rating) {
            let data = { rating };
            SupportApi.setRating(this.ticketId, data).then(() => {
                this.isRated = true;
            });
        },
        isAuthorNeeded(message, i, messages) {
            if (i == 0) {
                return true;
            }
            while (i < messages.length) {
                return message.isSupport != messages[i - 1].isSupport ? true : false;
            }
        },
        async getMessages() {
            let { items } = await SupportApi.getList();
            let ticket = items.filter(it => it.ticketId == this.ticketId)[0];
            this.messages = ticket.messages;
            this.topic = this.topics[ticket.topic].name;

            this.messages.sort((a, b) => b.createdAt - a.createdAt).forEach(it => {
                it.createdAt = moment.unix(it.createdAt).format("DD.MM.YYYY - HH:mm");
            });
        },
        validateMessage() {
            const button = document.querySelector(".btn-success");
            (this.newMessage.text && this.selectedTopic !== "") ||
            (this.newMessage.text && this.ticketId) ?
            (button.disabled = false) :
            (button.disabled = true);
        },
        createTicket() {
            let ticketData = this.getFormData(new FormData(), {
                name: "",
                userContact: "",
                topic: this.topics.indexOf(this.selectedTopic),
                content: this.newMessage.text,
                images: this.newMessage.images.map(it => it.image)
            });

            SupportApi.createTicket(ticketData).then(() => {
                this.$router.push({
                    name: "support:list"
                });
            });
        },
        createMessage() {
            let messageData = this.getFormData(new FormData(), {
                ticketId: this.ticketId,
                content: this.newMessage.text,
                images: this.newMessage.images.map(it => it.image)
            });
            SupportApi.createMessage(messageData).then(() => {
                let message = {
                    content: this.newMessage.text,
                    files: this.newMessage.images.map(it => it.decoded),
                    createdAt: moment().format("DD.MM.YYYY - HH:mm"),
                    isSupport: false,
                    isJustCreated: true
                };

                this.messages.unshift(message);
                this.newMessage.text = "";
                this.newMessage.images = [];
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
        showImage(evt) {
            swal({
                width: "80%",
                showCloseButton: true,
                showCancelButton: false,
                showConfirmButton: false,
                animation: false,
                imageUrl: evt.target.src
            });
            document.querySelector(".swal2-close").blur();
        }
    }
});
</script>
<style lang="scss">
.form-group-textarea {
    position: relative;
}

.image-upload {
    position: absolute;
    right: 15px;
    bottom: 5px;
}

.rating {
    position: relative;

    &__wrapper {
        position: absolute;
        top: 0;
        left: 0;
    }
}

.message {
    padding-left: 0;
    padding-right: 0;

    &__author {
        color: #6c757d;
    }

    &__content {
        border: 2px solid #dee2ee;
        color: #576077;
        font-size: 0.9rem;
        line-height: 20px;
        padding: 10px;
        padding-bottom: 3px;
        border-radius: 0 0.5rem 0.5rem 0.5rem;

        &--support {
            border-radius: 0.5rem 0 0.5rem 0.5rem;
            border-color: #ffc107;
        }
    }

    &__date {
        color: #dee2ee;
    }

    &__images {
        max-width: 100%;
    }

    &__image {
        border-radius: 0.25rem;
    }
}
</style>