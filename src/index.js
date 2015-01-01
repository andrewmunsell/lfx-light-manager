/**
 * @author Andrew Munsell <andrew@wizardapps.net>
 * @copyright 2015 Andrew Munsell
 * @license http://www.gnu.org/licenses/ GNU GPLv3
 */

var extend 	= require('extend'),
	Color 	= require('tinycolor2');

/**
 * Default options for the light manager
 * @type {Object}
 */
var defaults = {
	'leds': 25, // Default strand of LEDs has a length of 25
	'connector': {
		'name': 'lfx-spi-connector',
		
		'options': {
			'device': '/dev/spidev0.0'
		}
	}
}

/**
 * Light manager
 * @param {object} config Configuration options
 */
function Manager(config) {
	this.config = extend(true, defaults, config);

	var conn;
	if(this.config.connector.name == 'mock') {
		conn = require('./mock-connector');
	} else {
		conn = require(this.config.connector.name);
	}

	this._connector = new conn(this.config.connector.options);

	// Reset the buffer and animations
	this.clear();

	// Write the blank buffer to the strand to clear it out
	this.render();
};

/**
 * Retrieve the pixel RGB value at the specified offset
 * @param  {number} offset LED to get the RGB value for
 * @return {object}        Object containing RGB values of the specified pixel
 */
Manager.prototype.get = function(offset) {
	if(offset < 0 || offset >= this._buffer.length / 3)
		throw new Exception('Index out of bounds for LED buffer.');

	return {
		'r': this._buffer[offset],
		'g': this._buffer[offset + 1],
		'b': this._buffer[offset + 2]
	}
};

/**
 * Retrieve the pixel HSL value at the specified offset
 * @param  {number} offset LED to get the HSL value for
 * @return {object}        Object containing HSL values of the specified pixel
 */
Manager.prototype.getHSL = function(offset) {
	var c = Color(this.get(offset)).toHsl();

	// Remove the extra alpha value.
	delete c.a;

	return c;
};

/**
 * Set a single LED to the specified color.
 * @param {number} offset LED to set
 * @param {number} r      Red value
 * @param {number} g      Green value
 * @param {number} b      Blue value
 */
Manager.prototype.set = function(offset, r, g, b) {
	if(offset < 0 || offset >= this._buffer.length / 3) {
		throw new Exception('Index out of bounds for LED buffer.');
	}

	if(r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
		throw new Exception('Invalid integer to byte conversion for RGB data.');
	}

	this._buffer[offset * 3] = r;
	this._buffer[offset * 3 + 1] = g;
	this._buffer[offset * 3 + 2] = b;
};

/**
 * Set every Nth LED to the specified color, beginning at the specified offset and
 * ending at the specified ending point (inclusive, exclusive).
 * @param {number} offset Offset of the first LED to set
 * @param {number} nth    
 * @param {number} end    Ending bound for the LEDs to set every Nth LED
 * @param {number} r      Red value
 * @param {number} g      Green value
 * @param {number} b      Blue value
 */
Manager.prototype.setEveryNth = function(offset, nth, end, r, g, b) {
	if(offset < 0 || offset >= this._buffer.length / 3) {
		throw new Exception('Offset index out of bounds for LED buffer.');
	}

	if(end < offset || end < 0 || end > this._buffer.length / 3) {
		throw new Exception('End index out of bounds for LED buffer.');
	}

	if(r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255) {
		throw new Exception('Invalid integer to byte conversion for RGB data.');
	}

	for (var i = offset; i < offset + end; i += (nth + 1)) {
		this.set(i, r, g, b);
	};
};

/**
 * Set the range of LEDs from the offset to the end index with the specified color. The
 * range is inclusive, exclusive.
 * @param  {number} offset Offset of the first LED to set
 * @param  {number} end    Ending bound for the range fill
 * @param  {number} r      Red value
 * @param  {number} g      Green value
 * @param  {number} b      Blue value
 */
Manager.prototype.fillRange = function(offset, end, r, g, b) {
	this.setEveryNth(offset, 0, end, r, g, b);
};

/**
 * Fill the entire fixture with the specified RGB color
 * @param  {number} r Red value
 * @param  {number} g Green value
 * @param  {number} b Blue value
 */
Manager.prototype.fill = function(r, g, b) {
	this.fillRange(0, this.config.leds, r, g, b);
};

/**
 * Remove all animations from the manager and clear the strand.
 */
Manager.prototype.clear = function() {
	this._animations = [];
	
	this.blank();
};

/**
 * Blanks the LED strand by filling the pixel buffer with zeroes
 */
Manager.prototype.blank = function() {
	this._buffer = new Buffer(Array(this.config.leds * 3));
};

/**
 * Render the current animations onto the LEDs.
 */
Manager.prototype.render = function() {
	for (var i = 0; i < this._animations.length; i++) {
		this._animations[i].render();
	}

	this._connector.render(this._buffer);
};

/**
 * Get the size of the strand of LEDs controlled by this manager
 */
Manager.prototype.size = function() {
	return this.config.leds;
};

module.exports = Manager;