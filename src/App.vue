<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Weatherman</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-row>
          <v-col sm="6" lg="4" v-for="card in valueCards" :key="card.attribute">
            <v-card outlined>
              <v-card-text class="text-center">
                <p class="ma-0 display-1 text--primary" v-if="latest[card.attribute]">{{ latest[card.attribute] }} {{ card.unit }}</p>
                <p class="ma-0 display-1" v-else>n/a</p>
                <p class="ma-0 caption">
                  {{ card.name }}
                </p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col sm="6" lg="4">
            <v-card outlined>
              <v-card-text class="text-center">
                    <p class="ma-0 display-1 text--primary" :style="'transform: rotate(' + latest.windDirection + 'deg); display: block;'">🡑</p>
                    <p class="ma-0 display-1 text--primary">
                        {{ windCardinal }}
                    </p>
                <p class="ma-0 caption">
                  Wind Direction
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <p><pre><code>{{ latest }}</code></pre></p>

        <p>
            <ul>
                <li><b>Wind Condition:</b> {{ beaufortString }} ({{ beaufortValue }}/12)</li>
                <li><b>Wind Chill:</b> {{ windChill }}°C</li>
                <li>
                    <b>Heat Index:</b>
                    {{ heatIndex }}°C
                    <span v-if="heatIndexWarning" class="red--text">{{ heatIndexWarning }}</span>
                </li>
            </ul>
        </p>

        <p>
            <ul>
                <li>Weather data from {{ latest.date }}</li>
                <li>Last updated {{ lastUpdate }}</li>
            </ul>
        </p>

        <v-btn @click="refresh()">Refresh</v-btn>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import util from './util';

export default {
    name: 'App',
    data: () => ({
        valueCards: [
            {
                attribute: "temperatureOut",
                name: "Temperature",
                unit: "°C"
            },
            {
                attribute: "humidity",
                name: "Humidity",
                unit: "%"
            },
            {
                attribute: "pressure",
                name: "Pressure",
                unit: "mbar"
            },
            {
                attribute: "rain",
                name: "Rain",
                unit: "mm"
            }
        ]
    }),
    methods: {
        refresh() {
            this.$store.dispatch("getLatest");
        }
    },
    mounted() {
        this.refresh();
    },
    computed: {
        ...mapState(["latest", "lastUpdate"]),
        windCardinal() {
            return util.degreesToCardinal(this.$store.state.latest.windDirection);
        },
        beaufortValue() {
            return util.beaufort(this.$store.state.latest.averageWindSpeed);
        },
        beaufortString() {
            return util.beaufortToString(this.beaufortValue);
        },
        windChill() {
            return util.windChill(this.$store.state.latest.temperatureOut, this.$store.state.latest.averageWindSpeed);
        },
        heatIndex() {
            return util.heatIndex(this.$store.state.latest.temperatureOut, this.$store.state.latest.humidity);
        },
        heatIndexWarning() {
            return util.heatIndexWarning(this.heatIndex);
        }
    }
};
</script>
