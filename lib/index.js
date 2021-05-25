import result from "#lib/_browser/index";

export default result;

// register globally
import util from "util";

result.Result.prototype[util.inspect.custom] = function ( depth, options ) {
    return this.toJSON();
};

global.result = result;
