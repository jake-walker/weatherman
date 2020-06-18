<template>
    <v-container>
        <v-card outlined class="mb-4">
            <v-card-text class="text-center py-10">
                <p class="text-h2 text--primary mb-2">{{ temperature }}°C</p>
                <!--<p class="text-h5 mb-0">Condition</p>-->
            </v-card-text>
        </v-card>

        <v-card outlined class="mb-4">
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Wind</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    {{ windSpeed }} m/s
                </v-list-item-action>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Wind Direction</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    {{ windDirection }}
                </v-list-item-action>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Pressure</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    {{ pressure }} hPa
                </v-list-item-action>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Humidity</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    {{ humidity }}%
                </v-list-item-action>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Rain</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    {{ rain }} mm
                </v-list-item-action>
            </v-list-item>
        </v-card>

        <v-card outlined>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Last Update</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    {{ lastUpdate }}
                </v-list-item-action>
            </v-list-item>
            <v-list-item>
                <v-list-item-content>
                    <v-list-item-title>Data Age</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                    {{ dataAge }}
                </v-list-item-action>
            </v-list-item>
        </v-card>

        <v-btn fixed fab bottom right color="accent" @click="refresh()">
            <v-icon>mdi-refresh</v-icon>
        </v-btn>
    </v-container>
</template>

<script>
import { mapState } from 'vuex';
import util from '../util';
import moment from 'moment';

export default {
    name: 'Home',
    data: () => ({
        lastUpdate: "Never",
        dataAge: "N/A"
    }),
    computed: {
        ...mapState({
            temperature: state => state.latest.temperatureOut,
            windSpeed: state => state.latest.averageWindSpeed,
            pressure: state => state.latest.pressure,
            humidity: state => state.latest.humidity,
            rain: state => state.latest.rain
        }),
        windDirection() {
            return util.degreesToCardinal(this.$store.state.latest.windDirection);
        }
    },
    mounted() {
        this.updateTimes();
        setInterval(this.updateTimes, 10000);
    },
    methods: {
        updateTimes() {
            var lastUpdateDate = this.$store.state.lastUpdate;
            if (lastUpdateDate) {
                this.lastUpdate = moment(lastUpdateDate).fromNow();
            } else {
                this.lastUpdate = "Never";
            }

            var latestDate = this.$store.state.latest.date;
            if (latestDate) {
                this.dataAge = moment(latestDate).fromNow(true) + " old";
            } else {
                this.dataAge = "N/A";
            }
        },
        refresh() {
            this.$store.dispatch("getLatest").then(() => {
                this.updateTimes();
            });
        }
    }
}
</script>
