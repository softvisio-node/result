// The error codes from and including -32768 to -32000 are reserved for pre-defined errors.
// Any code within this range, but not defined explicitly below is reserved for future use.
// The error codes are nearly the same as those suggested for
// XML-RPC at the following url: http://xmlrpc-epi.sourceforge.net/specs/rfc.fault_codes.php

export default {

    // don't use standard error codes in api response, create custom code, if needed
    "-32700": [400, "Parse Error"],
    "-32600": [400, "Invalid Request"],
    "-32601": [404, "Method Not Found"],
    "-32602": [400, "Invalid Params"],
    "-32603": [500, "Internal Error"],
    "-32000": [500, "Server Error"], // -32000 to -32099

    // custom common errors
    "-32800": [400, "RPC calls are not supported"],
    "-32801": [401, "Insufficient permissions to call API method"],
    "-32802": [429, "Too many requests"],
    "-32803": [415, "Unsupported content type"],
    "-32804": [405, "HTTP method not allowed"],
    "-32805": [403, "Private API method called"],
    "-32806": [400, "Parameters parsing error"],
    "-32807": [400, "Unable to decode RPC message body"],
    "-32808": [400, "Parameters validation error"],
    "-32809": [404, "API method not found"],
    "-32810": [400, "Persistent connection is required to call API method"],

    // custom upload errors
    "-32900": [400, "Upload using websockets is not supported"],
    "-32901": [411, "Upload size is required"],
    "-32902": [413, "Upload too large"],
    "-32903": [400, "API method not support uplads"],
    "-32904": [400, "API upload method called as RPC"],
    "-32905": [400, "Upload file is required"],
    "-32906": [400, "Upload file content type is invalid"],
    "-32907": [400, "Unexpected multipart/form-data field"],
};
