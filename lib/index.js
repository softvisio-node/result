const util = require( "node:util" );
const result = require( "#lib/_browser/index" );

module.expoorts = result;

// set console.log hook
result.Result.prototype[util.inspect.custom] = function ( depth, options ) {
    return this.toJSON();
};

// register globally
if ( !global.result?.isResult ) {
    Object.defineProperty( global, "result", {
        "configurable": false,
        "writable": false,
        "enumerable": true,
        "value": result,
    } );
}
