<template>
    <div class="theme-select">
        <label class="theme">
            <input type="radio" v-model="theme" name="theme" value="dark"/>
            <svg-icon :file-name="theme === 'dark' ? 'radio-checked' : 'radio-unchecked'"/>
            Dark theme
        </label>
        <label class="theme">
            <input type="radio" v-model="theme" name="theme" value="light"/>
            <svg-icon :file-name="theme === 'light' ? 'radio-checked' : 'radio-unchecked'"/>
            Light theme
        </label>
    </div>
</template>

<script>
    import SvgIcon from './SvgIcon';

    export default {
        name: 'ThemeSelect',
        components: {
            SvgIcon
        },
        computed: {
            theme: {
                get() {
                    return this.$store.getters.getTheme;
                },
                set(value) {
                    this.$store.dispatch('setTheme', value);
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    .theme-select {
        display: flex;
        align-items: center;
        justify-content: center;

        > .theme {
            flex: 0;
            display: flex;
            align-items: center;
            margin: 10px;
            white-space: nowrap;

            > input {
                display: none;
            }

            > .icon {
                width: 15px;
                margin-right: 4px;
            }
        }
    }
</style>