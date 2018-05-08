<template>
    <div class="timeframes fake p-3">
        <h4 class="text-center">Мы уже работаем над тем чтобы предоставить вам гибкую настройку времени постинга</h4>

        <h2 v-if="timeframes&&timeframes.length"
            class="price">{{dailyPostsStr}}
            <br> {{maxPostsStr}}
        </h2>
        <div class="cell-row">
            <div class="cell border-0 d-flex">&nbsp;</div>
            <div class="cell border-0 d-flex">00
                <span class="d-none d-xl-inline">:00</span>
            </div>
            <div class="cell border-0 d-flex">01
                <span class="d-none d-xl-inline">:00</span>
            </div>
            <div class="cell border-0 d-flex">02
                <span class="d-none d-xl-inline">:00</span>
            </div>
            <div class="cell border-0 d-flex">03
                <span class="d-none d-xl-inline">:00</span>
            </div>
            <div class="cell border-0 d-flex">04
                <span class="d-none d-xl-inline">:00</span>
            </div>
            <div class="cell border-0 d-flex">05
                <span class="d-none d-xl-inline">:00</span>
            </div>
            <div class="cell border-0 d-flex">06
                <span class="d-none d-xl-inline">:00</span>
            </div>
            <div class="cell border-0 d-flex">07
                <span class="d-none d-xl-inline">:00</span>
            </div>
            <div class="cell border-0 d-flex">08
                <span class="d-none d-xl-inline">:00</span>
            </div>
            <div class="cell border-0 d-flex">09
                <span class="d-none d-xl-inline">:00</span>
            </div>
            <div class="cell border-0 d-flex">10
                <span class="d-none d-xl-inline">:00</span>
            </div>
            <div class="cell border-0 d-flex">11
                <span class="d-none d-xl-inline">:00</span>
            </div>
            <div class="cell border-0 d-flex">12
                <span class="d-none d-xl-inline">:00</span>
            </div>
            <div class="cell border-0 d-flex">13
                <span class="d-none d-xl-inline">:00</span>
            </div>
            <div class="cell border-0 d-flex">14
                <span class="d-none d-xl-inline">:00</span>
            </div>
            <div class="cell border-0 d-flex">15
                <span class="d-none d-xl-inline">:00</span>
            </div>
            <div class="cell border-0 d-flex">16
                <span class="d-none d-xl-inline">:00</span>
            </div>
            <div class="cell border-0 d-flex">17
                <span class="d-none d-xl-inline">:00</span>
            </div>
            <div class="cell border-0 d-flex">18
                <span class="d-none d-xl-inline">:00</span>
            </div>
            <div class="cell border-0 d-flex">19
                <span class="d-none d-xl-inline">:00</span>
            </div>
            <div class="cell border-0 d-flex">20
                <span class="d-none d-xl-inline">:00</span>
            </div>
            <div class="cell border-0 d-flex">21
                <span class="d-none d-xl-inline">:00</span>
            </div>
            <div class="cell border-0 d-flex">22
                <span class="d-none d-xl-inline">:00</span>
            </div>
            <div class="cell border-0 d-flex">23
                <span class="d-none d-xl-inline">:00</span>
            </div>
        </div>
        <div class="cell-row">
            <div class="cell d-flex border-0">пн</div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
        </div>
        <div class="cell-row">
            <div class="cell d-flex border-0">вт</div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
        </div>
        <div class="cell-row">
            <div class="cell d-flex border-0">ср</div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
        </div>
        <div class="cell-row">
            <div class="cell d-flex border-0">чт</div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
        </div>
        <div class="cell-row">
            <div class="cell d-flex border-0">пт</div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
        </div>
        <div class="cell-row">
            <div class="cell d-flex border-0">сб</div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
        </div>
        <div class="cell-row">
            <div class="cell d-flex border-0">вс</div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
            <div class="cell d-flex"></div>
        </div>

    </div>
</template>
<script>
export default {
    data() {
        return {
            internalData: {}
        }
    },
    props: {
        timeframes: {
            type: Array,
            default () {
                return []
            }
        },
        maxPostsStr: {
            type: String,
            default: ''
        },
        dailyPostsStr: {
            type: String,
            default: ''
        }
    },
}
</script>
<style lang="scss">
.timeframes {
    position: relative;
    &.fake {
        background-color: #dedede;
        .price {
            position: absolute;
            top: 50%;
            width: 100%;
            text-align: center;
        }
    }
    .cell-row {
        display: flex;
        justify-content: space-around;
    }
    .cell {
        border: 1px solid #ccc;
        padding: 5px;
        white-space: nowrap;
        width: 100%;
        height: 50px;
        user-select: none;
    }
}
</style>