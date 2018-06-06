<template>
    <collapse collapseHeader="Правила форматирования"
              class="col-lg-8 px-0 border-bottom-0 text-center">
        <div class="row">
            <div class="col-6">
                <h4>Результат</h4>
            </div>
            <div class="col-6">
                <h4>Правило</h4>
            </div>
        </div>
        <div class="row">
            <div class="col-6 border-right">
                <a href="https://telepay.io"
                   target="_blank">Ссылка</a>
            </div>
            <div class="col-6">[Ссылка](https://telepay.io)</div>
        </div>
        <div class="row">
            <div class="col-6 border-right">
                <b>Жирный</b>
            </div>
            <div class="col-6">*Жирный*</div>
        </div>
        <div class="row">
            <div class="col-6 border-right">
                <i>Курсив</i>
            </div>
            <div class="col-6">_Курсив_</div>
        </div>
        <div class="row">
            <div class="col-6 border-right">
                <pre class="m-0 d-inline">Выделение кода</pre> </div>
            <div class="col-6">`Выделение кода`</div>
        </div>
    </collapse>
</template>
<script type="text/javascript">
import collapse from '@components/collapse';
export default {
    components: {
        collapse
    },
    props: ['text'],
    data() {
        return {};
    }
};
</script>