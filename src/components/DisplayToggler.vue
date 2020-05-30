<template>
    <div class="display-toggler">
        <label>Display:</label>
        <button v-for="(item, index) in display"
                :class="item.visible ? 'on' : 'off'"
                @click="toggleDisplay(item.name)"
                :key="index"
        >
            <svg-icon :file-name="item.visible ? 'eye' : 'invisible'"/>
            <span>{{ item.label }}</span>
        </button>
    </div>
</template>

<script>
    import SvgIcon from './SvgIcon';

    export default {
        name: 'DisplayToggler',
        components: {SvgIcon},
        computed: {
            display() {
                return this.$store.getters.getDisplay;
            }
        },
        methods: {
            toggleDisplay(displayName) {
                this.$store.dispatch('toggleDisplay', displayName);
            }
        }
    }
</script>

<style scoped lang="scss">
    .display-toggler {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;

        > button {
            display: flex;
            align-items: center;
            justify-content: center;
            margin-left: 8px;
            border: 0;
            border-radius: 4px;
            padding: 8px 12px;
            color: #FFFFFF;
            transition: background-color 0.5s, box-shadow 0.3s;

            &.on {
                background-color: #217DBB;
            }

            &.off {
                background-color: #464545;
            }

            > .icon {
                width: 15px;
                margin-right: 4px;
            }
        }
    }
</style>