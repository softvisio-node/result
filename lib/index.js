import result from "#lib/_browser/index";

export default result;

// set console.log hook
result.Result.prototype[ Symbol.for( "nodejs.util.inspect.custom" ) ] = function ( depth, options, inspect ) {
    return "Result: " + inspect( this.toJSON() );
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
