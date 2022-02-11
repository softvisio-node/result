import util from "util";
import result from "#lib/_browser/index";

export default result;

// set console.log hook
result.Result.prototype[util.inspect.custom] = function ( depth, options ) {
    return this.toJSON();
};

// register globally
Object.defineProperty( global, "result", {
    "configurable": false,
    "writable": false,
    "enumerable": true,
    "value": result,
} );
