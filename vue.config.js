const fs = require("fs");
const packageJson = fs.readFileSync("./package.json");
process.env.VUE_APP_VERSION = JSON.parse(packageJson).version || 0;

module.exports = {
    "transpileDependencies": [
        "vuetify",
        "vuex-persist"
    ],
    pwa: {
        name: "Weatherman",
        themeColor: "#00bcd4",
        msTileColor: "#00bcd4",
        appleMobileWebCapable: "yes"
    }
}
