<template>
    <div class="wrapper">
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
                    let body = document.getElementsByTagName('body');
                    let cssVars = '';
                    for (let v in this.cssVars) {
                        cssVars += `${v}: ${this.cssVars[v]};`
                    }
                    body[0].style = cssVars;
                },
                immediate: true
            }
        },
        computed: {
            theme() {
                return this.$store.getters.getTheme;
            },
            cssVars() {
                if (this.theme === 'dark') {
                    return {
                        '--bg-color': '#222222',
                        '--color': '#FFFFFF',
                        '--link-color': '#217DBB',
                        '--btn-bg-color': '#217DBB',
                        '--btn-bg-color-hover': '#175883',
                        '--btn-bg-color-inactive': '#454545',
                        '--btn-bg-color-inactive-hover': '#313030',
                    }
                } else {
                    return {
                        '--bg-color': '#FFFFFF',
                        '--color': '#2C3E50',
                        '--link-color': '#84C0E9',
                        '--btn-bg-color': '#84C0E9',
                        '--btn-bg-color-hover': '#2790D8',
                        '--btn-bg-color-inactive': '#A2A2A2',
                        '--btn-bg-color-inactive-hover': '#717171',
                    }
                }
            }
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
