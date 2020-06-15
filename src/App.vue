<template>
    <div class="wrapper" ref="appWrapper">
        <header>Clicker Lister</header>
        <theme-select/>
        <save-input/>
        <display-toggler/>
        <lister-area/>
        <footer>Made by graceoflives. Icons made by <a href="https://www.flaticon.com/authors/google" title="Google">Google</a>
            from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></footer>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import ThemeSelect from './components/ThemeSelect';
    import SaveInput from './components/SaveInput';
    import DisplayToggler from './components/DisplayToggler';
    import ListerArea from './components/ListerArea';

    export default {
        name: 'App',
        components: {
            ListerArea,
            SaveInput,
            ThemeSelect,
            DisplayToggler
        },
        watch: {
            theme: {
                handler: function () {
                    for (let [k, v] of Object.entries(this.cssVars)) {
                        document.body.style.setProperty(k, v);
                    }
                },
                immediate: true
            }
        },
        computed: {
            ...mapGetters({
                theme: 'getTheme',
                cssVars: 'getCSSVars'
            })
        }
    }
</script>

<style scoped lang="scss">
    .wrapper {
        > header {
            margin: 15px 0;
            font-size: 40px;
            text-align: center;
            text-transform: uppercase;
        }

        > footer {
            margin: 10px 0;
            padding-left: 10px;
        }
    }
</style>
