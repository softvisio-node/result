// The error codes from and including -32768 to -32000 are reserved for pre-defined errors.
// Any code within this range, but not defined explicitly below is reserved for future use.
// The error codes are nearly the same as those suggested for
// XML-RPC at the following url: http://xmlrpc-epi.sourceforge.net/specs/rfc.fault_codes.php

export default {
    "-32700": "Parse error",
    "-32600": "Invalid Request",
    "-32601": "Method not found    ",
    "-32602": "Invalid params",
    "-32603": "Internal error",
    "-32000": "Server error", // -32000 to -32099

    // custom error codes
    "-32800": "RPC calls are not supported",
    "-32801": "Insufficient permissions",
};
