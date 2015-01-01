/**
 * @author Andrew Munsell <andrew@wizardapps.net>
 * @copyright 2015 Andrew Munsell
 * @license http://www.gnu.org/licenses/ GNU GPLv3
 */

var extend = require('extend');

/**
 * Default options for the mock connector
 * @type {Object}
 */
var defaults = {
	'fail': false // Should the render always fail?
}

/**
 * Mock Connector for LFX. Doesn't do anything with LED data.
 * @param {object} config Configuration options
 */
function Connector(config) {
	this.config = extend(true, defaults, config);
}

/**
 * Render the byte buffer to the LED string.
 * @param  {Buffer} buffer Buffer of bytes containing data for the LED string
 */
Connector.prototype.render = function(buffer) {
	// Do nothing, since this is a mock connector,
	// unless the failure setting is on.
	
	if(this.config.fail) {
		throw new Exception('Failed to render the LED data.');
	}
}

module.exports = Connector;