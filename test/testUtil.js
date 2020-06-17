var util = require("../src/util");
var assert = require("chai").assert;

describe("util", function() {
    describe("#windChill()", function() {
        it("should return -24 when temperature is -20 degC and wind speed is 1.39 ms^-1", function() {
            assert.equal(util.windChill(-20, 1.389), -24);
        });
        it("should return -33 when temperature is -20 degC and wind speed is 8.33 ms^-1", function() {
            assert.equal(util.windChill(-20, 8.33), -33);
        });
        it("should return the original temperature when temperature is out of bounds", function() {
            assert.equal(util.windChill(20, 10), 20);
        });
        it("should return the original temperature when wind speed is out of bounds", function() {
            assert.equal(util.windChill(-20, 0), -20);
        });
    });

    describe("#heatIndex()", function() {
        it("should return 19 when temperature is 20 degC and humidity is 40%", function() {
            assert.equal(util.heatIndex(20, 40), 19);
        });
        it("should return 37 when temperature is 32 degC and humidity is 60%", function() {
            assert.equal(util.heatIndex(32, 60), 37);
        });
        it("should return 28 when temperature is 30 degC and humidity is 10%", function() {
            assert.equal(util.heatIndex(30, 10), 28);
        });
        it("should return 41 when temperature is 30 degC and humidity is 90%", function() {
            assert.equal(util.heatIndex(30, 90), 41);
        });
    });
});
