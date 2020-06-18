<template>
    <div>
        <div id="header">
            <v-img :src="require('../assets/logo.png')" height="150" contain></v-img>
        </div>

        <v-container>
            <h1>Weatherman</h1>
            <p>
                Weatherman is a weather app progressive web app which uses data
                from a home weather station.
            </p>

            <v-btn v-for="link in projectLinks" :key="link.link" :href="link.link" color="accent">
                <v-icon left>{{ link.icon }}</v-icon>
                {{ link.name }}
            </v-btn>
        </v-container>

        <v-container class="pa-0">
            <v-list>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title>Version</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-action>
                        {{ version }}
                    </v-list-item-action>
                </v-list-item>
            </v-list>
        </v-container>
    </div>
</template>

<style scoped>
    #header {
        background-color: #eeeeee;
        padding-top: 40px;
        padding-bottom: 40px;
    }
</style>

<script>
export default {
    name: "About",
    data: () => ({
        version: process.env.VUE_APP_VERSION || 0,
        projectLinks: [
            {
                icon: "mdi-github",
                name: "GitHub",
                link: "https://github.com/jake-walker/weatherman"
            }
        ]
    })
}
</script>
