var extend = require("extend");

/**
 * Default options for the light manager
 * @type {Object}
 */
var defaults = {
	
}

/**
 * Light manager
 * @param {object} config Configuration options
 */
function Manager(config) {
	this.config = extend(true, defaults, config);
}

module.exports = Manager;