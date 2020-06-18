module.exports = {
    /**
     * Convert an angle in degrees to a compass direction.
     *
     * @param {Number} d The angle to convert in degrees.
     * @returns {String} The compass direction.
     */
    degreesToCardinal(d) {
        const degreePerDirection = 360 / 8;
        const offsetAngle = d + degreePerDirection / 2;
        return (offsetAngle >= 0 * degreePerDirection && offsetAngle < 1 * degreePerDirection) ? "North"
            : (offsetAngle >= 1 * degreePerDirection && offsetAngle < 2 * degreePerDirection) ? "North East"
                : (offsetAngle >= 2 * degreePerDirection && offsetAngle < 3 * degreePerDirection) ? "East"
                    : (offsetAngle >= 3 * degreePerDirection && offsetAngle < 4 * degreePerDirection) ? "South East"
                        : (offsetAngle >= 4 * degreePerDirection && offsetAngle < 5 * degreePerDirection) ? "South"
                            : (offsetAngle >= 5 * degreePerDirection && offsetAngle < 6 * degreePerDirection) ? "South West"
                                : (offsetAngle >= 6 * degreePerDirection && offsetAngle < 7 * degreePerDirection) ? "West"
                                    : "North West";
    },
    /**
     * Convert a wind speed to a numerical beaufort scale value.
     *
     * @param {Number} speed The wind speed in metres per second.
     * @returns {Number} The calculated numerical beaufort index value.
     */
    beaufort(speed) {
        if (speed < 1) {
            return 0;
        } else if (speed < 2) {
            return 1;
        } else if (speed < 3) {
            return 2;
        } else if (speed < 5) {
            return 3;
        } else if (speed < 8) {
            return 4;
        } else if (speed < 11) {
            return 5;
        } else if (speed < 14) {
            return 6;
        } else if (speed < 17) {
            return 7;
        } else if (speed < 21) {
            return 8;
        } else if (speed < 24) {
            return 9;
        } else if (speed < 28) {
            return 10;
        } else if (speed < 32) {
            return 11;
        } else {
            return 12;
        }
    },
    /**
     * Convert a beaufort scale numerical value to a description.
     *
     * @param {Number} beaufortValue The beaufort value to convert.
     * @return {String} The beaufort index description.
     */
    beaufortToString(beaufortValue) {
        switch(beaufortValue) {
            case 0:
                return "Calm";
            case 1:
                return "Light air";
            case 2:
                return "Light breeze";
            case 3:
                return "Gentle breeze";
            case 4:
                return "Moderate breeze";
            case 5:
                return "Fresh breeze";
            case 7:
                return "Near gale";
            case 8:
                return "Gale";
            case 9:
                return "Strong gale";
            case 10:
                return "Storm";
            case 11:
                return "Violent Storm";
            case 12:
                return "Hurricane";
            default:
                return "n/a";
        }
    },
    /**
     * Calculate the wind chill temperature.
     *
     * @param {Number} temp The air temperature in degrees celcius.
     * @param {Number} wind The wind speed in metres per second.
     * @return {Number} The wind chill temperature in degrees celcius.
     */
    windChill(temp, wind) {
        const t = temp;
        // Convert wind speed from metres per second to kilometres per hour
        const w = wind * 3.6;

        if (t > 10 || w < 1.33) {
            return t;
        }

        // Calculate wind chill
        const wc = 13.12 + (0.6215 * t) - (11.37 * w**0.16) + (0.3965 * t * w**0.16);

        // Return the rounded wind chill
        return Math.round(wc);
    },
    /**
     * Calculate the heat index.
     *
     * @param {Number} temp The air temperature in degrees celcius.
     * @param {Number} humidity The relative humidity.
     * @returns {Number} Heat index in degrees celcius.
     */
    heatIndex(temp, humidity) {
        const t = (9 * temp / 5 + 32);
        const h = humidity;

        var hi = 0.5 * (t + 61 + (t - 68) * 1.2 + h * 0.094);

        if (t >= 80) {
            var hiBase = (-42.379                      +
                2.04901523 * t             +
               10.14333127         * h     +
               -0.22475541 * t     * h     +
               -0.00683783 * t * t         +
               -0.05481717         * h * h +
                0.00122874 * t * t * h     +
                0.00085282 * t     * h * h +
               -0.00000199 * t * t * h * h);

               if (h < 13 && t <= 112) {
                hi = hiBase - (13 - h) / 4 * Math.sqrt((17 - Math.abs(t - 95)) / 17);
            } else if (h > 85 && t <= 87) {
                hi = hiBase + ((h - 85) / 10) * ((87 - t) / 5)
            } else {
                hi = hiBase;
            }
        }

        // Return the rounded heat index
        return Math.round((5 * (hi - 32) / 9));
    },
    /**
     * Get a warning from a heat index value.
     *
     * @param {Number} heatIndex The heat index in degrees celcius.
     * @returns {String} A warning message or null.
     */
    heatIndexWarning(heatIndex) {
        if (heatIndex > 54) {
            return "Extreme danger: heat stroke is imminent.";
        } else if (heatIndex > 41) {
            return "Danger: heat cramps and heat exhaustion are likely; heat stroke is probable with continued activity.";
        } else if (heatIndex > 32) {
            return "Extreme caution: heat cramps and heat exhaustion are possible. Continuing activity could result in heat stroke.";
        } else if (heatIndex > 26) {
            return "Caution: fatigue is possible with prolonged exposure and activity. Continuing activity could result in heat cramps.";
        } else {
            return null;
        }
    }
}
