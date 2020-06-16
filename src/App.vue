<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Weatherman</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-row>
          <v-col sm="6" lg="4">
            <v-card outlined>
              <v-card-text class="text-center">
                <p class="ma-0 display-1 text--primary">28.1°C</p>
                <p class="ma-0 caption">
                  Temperature
                </p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col sm="6" lg="4">
            <v-card outlined>
              <v-card-text class="text-center">
                <p class="ma-0 display-1 text--primary">83%</p>
                <p class="ma-0 caption">
                  Humidity
                </p>
              </v-card-text>
            </v-card>
          </v-col>
          <v-col sm="6" lg="4">
            <v-card outlined>
              <v-card-text class="text-center">
                <p class="ma-0 display-1 text--primary">83%</p>
                <p class="ma-0 caption">
                  Forecast
                </p>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>
