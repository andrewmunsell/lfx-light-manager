var assert 			= require('assert'),
	LFXLightManager	= require('../src');
/**
 * Options to test the LFXLightManager with.
 * @type {Object}
 */
var options = {
	'leds': 100,

	'connector': {
		'name': 'mock'
	}
}

describe('LFXLightManager', function(){
	/**
	 * Test the constructor
	 */
	describe('#__constructor', function(){
		it('should properly set the configuration based on passed in options.', function(){
			var manager = new LFXLightManager(options);

			assert.equal(options.leds, manager.config.leds);
		});
	});

	/**
	 * Test the .get method
	 */
	describe('#get(Number)', function(){
		it('should return an object containing RGB values.', function(){
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

		it('should throw an exception if the offset is out of bounds.', function(){
			var manager = new LFXLightManager(options);

			assert.throws(function(){
				manager.get(options.leds);
			}, Error);
		});
	});

	/**
	 * Test the .getHSL method
	 */
	describe('#getHSL(Number)', function(){
		it('should return an object containing HSL values.', function(){
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

	describe('#setEveryNth(Number, Number, Number, Number, Number, Number)', function() {
		it('should set every 0th (i.e. every one) LED to white.', function() {
			var manager = new LFXLightManager(options);

			// Set every 0th LED to white
			manager.setEveryNth(0, 0, manager.config.leds - 1, 255, 255, 255);

			for (var i = 0; i < manager.config.leds.length; i++) {
				assert.deepEqual({
					r: 255,
					g: 255,
					b: 255
				}, manager.get(i));
			};
		});

		it('should set every 1st (i.e. every other) LED to white.', function() {
			var manager = new LFXLightManager(options);

			// Set every 0th LED to white
			manager.setEveryNth(0, 1, manager.config.leds - 1, 255, 255, 255);

			for (var i = 0; i < manager.config.leds.length; i++) {
				if(i % 2 == 0) {
					assert.deepEqual({
						r: 255,
						g: 255,
						b: 255
					}, manager.get(i));
				} else {
					assert.deepEqual({
						r: 0,
						g: 0,
						b: 0
					}, manager.get(i));
				}
			};
		});
	});
});