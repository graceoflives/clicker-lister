import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        theme: 'dark',
        rawData: {},
        display: [
            {
                name: 'outsider',
                label: 'Outsiders',
                visible: true
            },
            {
                name: 'ancient',
                label: 'Ancients',
                visible: true
            },
            {
                name: 'gild',
                label: 'Gilds',
                visible: true
            },
            {
                name: 'raid',
                label: 'Raids',
                visible: true
            },
            {
                name: 'miscellaneous',
                label: 'Miscellaneous',
                visible: true
            },
            {
                name: 'time',
                label: 'Times',
                visible: true
            },
            {
                name: 'event',
                label: 'Events',
                visible: false
            },
            {
                name: 'relic',
                label: 'Relics',
                visible: false
            },
            {
                name: 'totalRelicBonus',
                label: 'Total Relic Bonuses',
                visible: false
            }
        ]
    },
    getters: {
        getTheme: store => store.theme,
        getCSSVars: store => store.theme === 'dark'
            ? {
                '--bg-color': '#222222',
                '--color': '#FFFFFF',
                '--link-color': '#217DBB',
                '--btn-bg-color': '#217DBB',
                '--btn-bg-color-hover': '#175883',
                '--btn-bg-color-inactive': '#454545',
                '--btn-bg-color-inactive-hover': '#313030',
            }
            : {
                '--bg-color': '#FFFFFF',
                '--color': '#2C3E50',
                '--link-color': '#84C0E9',
                '--btn-bg-color': '#84C0E9',
                '--btn-bg-color-hover': '#2790D8',
                '--btn-bg-color-inactive': '#A2A2A2',
                '--btn-bg-color-inactive-hover': '#717171',
            },
        getRawData: store => ({...store.rawData}),
        getDisplay: store => [...store.display]
    },
    mutations: {
        SET_THEME: (state, data) => {
            if (['dark', 'light'].includes(data)) {
                state.theme = data;
            }
        },
        SET_RAW_DATA: (state, data) => {
            state.rawData = {...data};
        },
        TOGGLE_DISPLAY: (state, displayName) => {
            state.display = state.display.map(item => {
                if (item.name === displayName) {
                    item.visible = !item.visible;
                }
                return item;
            })
        }
    },
    actions: {
        setTheme: ({commit}, data) => {
            commit('SET_THEME', data);
        },
        setRawData: ({commit}, data) => {
            commit('SET_RAW_DATA', data);
        },
        toggleDisplay: ({commit}, displayName) => {
            commit('TOGGLE_DISPLAY', displayName);
        }
    }
});

export default store;