// The error codes from and including -32768 to -32000 are reserved for pre-defined errors.
// Any code within this range, but not defined explicitly below is reserved for future use.
// The error codes are nearly the same as those suggested for
// XML-RPC at the following url: http://xmlrpc-epi.sourceforge.net/specs/rfc.fault_codes.php

export default {
    "-32700": [400, "Parse Error"],
    "-32600": [400, "Invalid Request"],
    "-32601": [404, "Method Not Found"],
    "-32602": [400, "Invalid Params"],
    "-32603": [500, "Internal Error"],
    "-32000": [500, "Server Error"], // -32000 to -32099

    // custom error codes
    "-32800": [400, "RPC Calls Are Not Supported"],
    "-32801": [400, "Insufficient Permissions"],
    "-32802": [400, "Too Many Requests"],
    "-32803": [415, "Invalid Content Type"],
    "-32804": [405, "HTTP Method Not Allowed"],
    "-32805": [413, "Payload Too Large"],
    "-32806": [411, "Length Required"],
};
