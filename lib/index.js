const result = require( "./browser" );

module.exports = result;

// register globally
const util = require( "util" );
result.Result.prototype[util.inspect.custom] = function ( depth, options ) {
    return this.toJSON();
};

global.result = result;
