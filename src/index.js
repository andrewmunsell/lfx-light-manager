/**
 * @author Andrew Munsell <andrew@wizardapps.net>
 * @copyright 2013 Andrew Munsell
 * @license http://www.gnu.org/licenses/ GNU GPLv3
 */

var extend = require("extend");

/**
 * Default options for the light manager
 * @type {Object}
 */
var defaults = {
	"leds": 25, // Default strand of LEDs has a length of 25
	"connector": {
		"name": "lfx-spi-connector",
		
		"options": {
			"device": "/dev/spidev0.0"
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
	if(this.config.connector.name == "mock") {
		conn = require("./mock-connector");
	} else {
		conn = require(this.config.connector.name);
	}

	this._connector = new conn(this.config.connector.options);

	// Reset the buffer and animations
	this.clear();
}

Manager.prototype.get = function(offset, r, g, b) {
	if(offset < 0 || offset >= this._buffer.length / 3)
		throw new Exception("Index out of bounds for LED buffer.");

	return {
		"r": this._buffer[offset],
		"g": this._buffer[offset + 1],
		"b": this._buffer[offset + 2]
	}
}

/**
 * Set a single LED to the specified color.
 * @param {number} offset LED to set
 * @param {number} r      Red value
 * @param {number} g      Green value
 * @param {number} b      Blue value
 */
Manager.prototype.set = function(offset, r, g, b) {
	if(offset < 0 || offset >= this._buffer.length / 3)
		throw new Exception("Index out of bounds for LED buffer.");

	if(r < 0 || r > 255 || g < 0 || g > 255 || b < 0 || b > 255)
		throw new Exception("Invalid integer to byte conversion for RGB data.");

	this._buffer[offset * 3] = r;
	this._buffer[offset * 3 + 1] = g;
	this._buffer[offset * 3 + 2] = b;
};

/**
 * Render the current animations onto the LEDs.
 */
Manager.prototype.render = function() {
	for (var i = 0; i < this._animations.length; i++) {
		this._animations[i].render();
	}

	this._connector.render(this._buffer);
}

/**
 * Remove all animations from the manager and clear the strand.
 */
Manager.prototype.clear = function() {
	this._animations = [];
	this._buffer = new Buffer(Array(this.config.leds * 3));

	this._connector.render(this._buffer);
}

module.exports = Manager;