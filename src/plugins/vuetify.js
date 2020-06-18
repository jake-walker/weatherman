import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import { colors } from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: colors.cyan.base,
                secondary: colors.cyan.darken2,
                accent: colors.lime.darken1
            }
        }
    }
});
