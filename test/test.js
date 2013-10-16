var assert 			= require("assert"),
	LFXLightManager	= require("../src");
/**
 * Options to test the LFXLightManager with.
 * @type {Object}
 */
var options = {
	"leds": 100,

	"connector": {
		"name": "mock"
	}
}

describe("LFXLightManager", function(){
	/**
	 * Test the constructor
	 */
	describe("#__constructor", function(){
		it("should properly set the configuration based on passed in options.", function(){
			var manager = new LFXLightManager(options);

			assert.equal(options.leds, manager.config.leds);
		});
	});

	/**
	 * Test the .get method
	 */
	describe("#get(Number)", function(){
		it("should return an object containing RGB values.", function(){
			var manager = new LFXLightManager(options);

			// Set the first LED to be white
			manager.set(0, 255, 255, 255);

			// Now, ensure the LED was actually set
			assert.deepEqual({
				r: 255,
				g: 255,
				b: 255
			}, manager.get(0));
		});
	});

	/**
	 * Test the .getHSL method
	 */
	describe("#getHSL(Number)", function(){
		it("should return an object containing HSL values.", function(){
			var manager = new LFXLightManager(options);

			// Set the first LED to be white
			manager.set(0, 255, 255, 255);

			// Now, ensure the LED was actually set
			assert.deepEqual({
				h: 0,
				s: 0,
				l: 1
			}, manager.getHSL(0));
		});
	});
});