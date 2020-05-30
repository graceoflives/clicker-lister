<template>
    <div class="icon" v-html="require('!!html-loader!../assets/' + fileName + '.svg')"></div>
</template>

<script>
    export default {
        name: 'SvgIcon',
        props: {
            fileName: {
                type: String,
                required: true
            }
        }
    }
</script>
<style scoped lang="scss">
    .icon {
        line-height: 0;
    }
</style>