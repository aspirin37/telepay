<template>
    <div class="wrap mb-3">
        <div class="textarea-input">
            <textarea class="form-control"
                placeholder="Введите сообщение..."
                rows="4"
                v-model="text"
                ref="text"></textarea>
            <div class="textarea-input__icons">
                <label class="textarea-input__file-label textarea-input__icon">
                    <i class="fa fa-lg fa-camera"
                        aria-hidden="true"></i>
                    <input type="file"
                        id="file-upload"
                        accept="image/*"
                        class="textarea-input__file-input"
                        @change="addImage" />
                </label>
            </div>
        </div>
        <div v-if="images.length"
            class="file-previews">
            <div v-for="(src, i) in images"
                :key="i"
                class="file-previews__item rounded"
                :style="{ 'background-image': 'url(' + src.decoded + ')' }"
                @click="showImage(src.decoded)">
                <span class="file-previews__remove"
                    @click="removeImage(i)">
                    <i class="fa fa-times"
                        aria-hidden="true"></i>
                </span>
            </div>
        </div>

    </div>
</template>

<script>

export default {
  props: ["newText", "newImages"],
  data() {
    return {
      text: "",
      images: [],
      maxImages: 2
    };
  },
  created() {
    if (this.value) {
      let { text, images } = this.value;
      this.text = text;
      this.iamges = images;
    }
  },
  watch: {
    newText() {
      this.text = this.newText;
    },
    newImages() {
      this.images = this.newImages;
    },
    images() {
      this.updateModel();
    },
    text(msg) {
      if (msg.length > this.maxLength) {
        this.text = msg.slice(0, this.maxLength);
        return;
      }
      this.updateModel();
    }
  },
  computed: {
    maxLength() {
      return this.images.length ? 200 : 4096;
    }
  },
  methods: {
    updateModel() {
      this.$emit("input", {
        text: this.text,
        images: this.images
      });
    },

    addImage(evt) {
      const image = document.getElementById("file-upload").files[0];
      const reader = new FileReader();

      if (this.images.length + 1 <= this.maxImages) {
        if (image.size / 1024 / 1024 > 1) {
          return this.$notifystr.danger(
            "Ошибка!",
            "Размер файла не должен превышать 1мб"
          );
        }

        reader.onload = () => {
          this.images.push({
            decoded: reader.result,
            image
          });
        };

        reader.readAsDataURL(image);
      } else {
        let message;
        switch (this.maxImages) {
          case 1:
            message = "изображение";
            break;
          case 2:
          case 3:
          case 4:
            message = "изображения";
            break;
          default:
            message = "изображений";
            break;
        }
        this.$notifystr.warning(
          "Внимание",
          `Можно прикрепить только ${this.maxImages} ${message}`
        );
      }
    },
    removeImage(index) {
      this.images = this.images.filter((img, idx) => idx !== index);
    },
    showImage(src) {
      swal({
        width: "80%",
        showCloseButton: true,
        showCancelButton: false,
        showConfirmButton: false,
        animation: false,
        imageUrl: src
      });
      document.querySelector(".swal2-close").blur();
    }
  }
};
</script>

<style lang="scss">
.file-previews {
  display: flex;
  position: absolute;
  left: 0;
  bottom: -40px;
  padding-top: 10px;
  .file-previews__item {
    position: relative;
    width: 50px;
    height: 50px;
    margin-right: 6px;
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
    bottom: 10px;
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
  &__file-input {
    display: none;
  }
  .fa {
    cursor: pointer;
  }
}
</style>