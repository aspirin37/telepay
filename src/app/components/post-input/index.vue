<template>
    <div class="wrap">
        <div class="textarea-input">
            <textarea class="form-control"
                      rows="4"
                      v-model="text"
                      ref="text"></textarea>
            <div class="textarea-input__icons">
                <label @click="addButton"
                       class="textarea-input__icon">
                    <i class="fa fa-plus-circle"
                       v-tooltip="'Добавить инлайн кнопку'"></i>
                </label>
                <label class="textarea-input__file-label textarea-input__icon">
                    <i class="fa fa-camera text-medium-font"
                       v-tooltip="'Добавить изображение'"
                       aria-hidden="true"></i>
                    <input type="file"
                           accept="image/*"
                           class="textarea-input__file-input"
                           @change="addImage" />
                </label>
                <dropdown :style="{ 'margin-right': '3px' }"
                          class="textarea-input__icon">
                    <i slot="trigger"
                       v-tooltip="'Добавить эмоджи'"
                       class="fa fa-smile-o text-medium-font"
                       aria-hidden="true"></i>
                    <div class="textarea-input__emoji"
                         slot="body">
                        <Picker :emoji-size="16"
                                :i18n="i18n"
                                @click="addEmoji" />
                    </div>
                </dropdown>
            </div>
            <small class="text-muted">{{text.length}}/{{maxLength}}</small>
        </div>
        <div v-if="images && images.length"
             class="file-previews">
            <div v-for="(src, i) in images"
                 :key="i"
                 class="file-previews__item"
                 :style="{ 'background-image': `url(${typeof src === 'string'?'/images/posts/'+src:src.decoded})` }">
                <span class="file-previews__remove"
                      @click="removeImage(i)">
                    <i class="fa fa-times"
                       aria-hidden="true"></i>
                </span>
            </div>
        </div>
        <div class="form-row mt-2"
             :key="btn[0].id"
             v-for="btn in buttons">
            <div class="col">
                <input class="form-control"
                       type="text"
                       v-model="btn[0].text"
                       placeholder="Текст кнопки">
            </div>
            <div class="col">
                <input class="form-control"
                       type="text"
                       v-model="btn[0].url"
                       placeholder="Ссылка">
            </div>
            <div class="col-1">
                <button class="btn"
                        @click="removeButton(btn[0].id)">
                    <i class="fa fa-trash"></i>
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { Picker } from 'emoji-mart-vue';
import dropdown from '@components/dropdown';
export default {
    components: {
        Picker,
        dropdown
    },
    props: {
        value: {
            default: ''
        },
        maxImages: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            text: 'Текст...',
            images: [],
            buttons: [],
            i18n: {
                categories: {
                    search: 'Результаты поиска',
                    recent: 'Часто используемые',
                    people: 'Смайлы и люди',
                    nature: 'Животные и природа',
                    foods: 'Еда',
                    activity: 'Мероприятия',
                    places: 'Путешествия',
                    objects: 'Предметы',
                    symbols: 'Символы',
                    flags: 'Флаги'
                }
            }
        };
    },
    created() {
        this.watchValue();
    },
    watch: {
        value() {
            this.watchValue();
        },
        buttons() {
            this.updateModel();
        },
        images() {
            this.updateModel();
        },
        text(msg) {
            if (msg && msg.length > this.maxLength) {
                this.text = msg.slice(0, this.maxLength);
                return;
            }
            this.updateModel();
        }
    },
    computed: {
        maxLength() {
            return this.images && this.images.length ? 200 : 4096;
        }
    },
    methods: {
        watchValue() {
            if (this.value) {
                let {
                    text,
                    images,
                    buttons
                } = this.value;

                this.text = text;
                this.images = images;
                this.buttons = buttons;
            }
        },
        updateModel() {
            this.$emit('input', {
                text: this.text,
                buttons: this.buttons,
                images: this.images
            });
        },

        addEmoji(emoji, e) {
            let selStart = this.$refs.text.selectionStart;
            console.log(selStart);
            if (selStart !== this.text.length) {
                let start = this.text.substr(0, selStart);
                let end = this.text.substr(selStart);
                this.text = start + emoji.native + end;
            } else {
                this.text += emoji.native;
            }
        },

        addImage(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            if (this.images && this.images.length + files.length <= this.maxImages) {
                for (let i = 0; i < files.length; i++) {
                    if (files[i].size / 1024 / 1024 > 1) {
                        this.$notifystr.danger('Ошибка!', 'Размер файла не должен превышать 2мб');
                    }
                    this._createImage(files[i]);
                }
                if (this.text.length > 200) {
                    this.text = this.text.slice(0, 200);
                }
            } else {
                this.$notifystr.warning('Внимание', `Можно прикрепить только ${this.maxImages} изображение`);
            }
        },
        _createImage(file) {
            let reader = new FileReader();
            reader.addEventListener('load', e => {
                console.log('loaded image', e, file);
                this.images.push({
                    decoded: e.target.result,
                    file
                });
            });
            reader.readAsDataURL(file);
        },
        removeImage(index) {
            this.images = this.images.filter((img, idx) => idx !== index);
        },

        addButton() {
            if (this.buttons && this.buttons.length >= 10) {
                return this.$notifystr.warning('Внимание', 'Можно прикрепить не более 10 кнопок');
            }
            this.buttons.push([{
                id: this.buttons.length,
                text: 'Текст кнопки',
                url: 'http://example.com'
            }]);
        },
        removeButton(index) {
            this.buttons = this.buttons.filter(item => item[0].id !== index);
        }
    }
};
</script>
<style lang="scss">
.file-previews {
    display: flex;
    left: 0;
    top: 100%;
    padding-top: 10px;
    .file-previews__item {
        position: relative;
        width: 50px;
        height: 50px;
        margin-right: 3px;
        cursor: pointer;
        background-position: center;
        background-size: cover;
        .file-previews__remove {
            position: absolute;
            right: 0;
            top: 0;
            font-size: 12px;
            line-height: 1;
            padding: 0 2px;
            z-index: 100;
            background: rgba(255, 255, 255, 0.9);
            color: rgb(0, 0, 0);
        }
    }
}

.textarea-input {
    position: relative;
    label {
        margin-bottom: 0;
    }
    &__icons {
        display: flex;
        position: absolute;
        bottom: 21px;
        right: 10px;
        background: rgba(255, 255, 255, 0.7);
        &:last-child {
            margin-right: 2px;
        }
        i {
            padding: 5px;
        }
    }
    &__icon:hover {
        color: lighten(#576077, 10%);
    }
    &__emoji {
        position: absolute;
        bottom: 100%;
        right: 0;
    }
    &__file-input {
        display: none;
    }
    .fa {
        cursor: pointer;
    }
}
</style>