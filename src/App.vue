<template>
    <v-app>
        <v-navigation-drawer v-model="drawer" app>
            <v-list dense :value="true">
                <v-list-item-group color="primary">
                    <v-list-item to="/">
                        <v-list-item-action>
                            <v-icon>mdi-home</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>Home</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item to="/about">
                        <v-list-item-action>
                            <v-icon>mdi-information</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>About</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="primary" dark>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>{{ !$route.name || $route.name == "Home" ? "Weatherman" : $route.name }}</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <router-view></router-view>
        </v-main>
    </v-app>
</template>

<script>
export default {
    data: () => ({
        drawer: null
    })
};
</script>
