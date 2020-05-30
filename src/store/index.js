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
        getRawData: store => ({...store.rawData}),
        getDisplay: store => ([...store.display])
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