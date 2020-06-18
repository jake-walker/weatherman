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
            state.latest.humidity = data.humidity;
            state.latest.temperatureIn = data.indoor_temperature_c;
            state.latest.temperatureOut = data.outdoor_temperature_c;
            state.latest.pressure = (data.pressure / 100.0);
            state.latest.rain = data.rain_mm;
            state.latest.date = new Date(data.timestamp);
            state.latest.averageWindSpeed = data.wind_avg_ms;
            state.latest.windDirection = data.wind_dir_deg;
            state.latest.maxWindSpeed = data.wind_max_ms;
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
