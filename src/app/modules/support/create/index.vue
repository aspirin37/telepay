<template src="./index.html"></template>
<script>
import { SupportApi } from "@services/api";
import searchInput from "@components/search-input";
import supportTextarea from "@components/support-textarea";
import topics from "@utils/support-topics";

export default Vue.extend({
    components: {
        searchInput,
        supportTextarea
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
            ticketId: this.$route.query.ticketId || null,
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
    },
    methods: {
        async getMessages() {
            let { items } = await SupportApi.getList();
            let ticket = items.filter(it => it.ticketId == this.ticketId)[0];
            this.messages = ticket.messages;
            this.topic = this.topics[ticket.topic].name;

            this.messages.sort((a, b) => b.createdAt - a.createdAt).forEach((it) => {
                it.createdAt = moment.unix(it.createdAt).format("DD.MM.YYYY - HH:mm")
            })
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
                    images: this.newMessage.images.map(it => it.image),
                    createdAt: moment().format("DD.MM.YYYY - HH:mm"),
                }
                this.messages.unshift(message)
                this.newMessage.text = ""
                this.newMessage.images = []
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

.message {
    padding-left: 0;
    padding-right: 0;
}

.message__author {
    color: #6c757d;
}

.message__content {
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

.message__date {
    color: #DEE2EE;
}
</style>