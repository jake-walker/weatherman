import Vue from 'vue';
import Vuex from 'vuex';
import api from '../api';
import VuexPersistence from 'vuex-persist';

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
});

export default new Vuex.Store({
    state: {
        latest: {
            humidity: null,
            temperatureIn: null,
            temperatureOut: null,
            pressure: null,
            rain: null,
            date: null,
            averageWindSpeed: null,
            windDirection: null,
            maxWindSpeed: null
        },
        lastUpdate: null
    },
    mutations: {
        UPDATE_LATEST(state, data) {
            console.log("Updating latest data", data);
            state.latest.humidity = data.humidity || null;
            state.latest.temperatureIn = data.indoor_temperature_c || null;
            state.latest.temperatureOut = data.outdoor_temperature_c || null;
            state.latest.pressure = (data.pressure / 100.0) || null;
            state.latest.rain = data.rain_mm || null;
            state.latest.date = new Date(data.timestamp) || null;
            state.latest.averageWindSpeed = data.wind_avg_ms || null;
            state.latest.windDirection = data.wind_dir_deg || null;
            state.latest.maxWindSpeed = data.wind_max_ms || null;
        }
    },
    actions: {
        async getLatest(context) {
            const latestData = await api.getLatest();
            context.commit("UPDATE_LATEST", latestData);
            context.state.lastUpdate = new Date();

        }
    },
    plugins: [
        vuexLocal.plugin
    ]
})
