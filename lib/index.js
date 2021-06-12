import util from "util";
import result from "#lib/_browser/index";

export default result;

// set console.log hook
result.Result.prototype[util.inspect.custom] = function ( depth, options ) {
    return this.toJSON();
};

// register globally
global.result = result;
