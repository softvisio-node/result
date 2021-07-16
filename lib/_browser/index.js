import STATUS_HTTP from "#resources/status-http.js";
import STATUS_WEBSOCKETS from "#resources/status-websockets.js";
import STATUS_JSON_RPC from "#resources/status-json-rpc.js";
import { objectIsPlain } from "@softvisio/utils";

const STATUS = { ...STATUS_HTTP, ...STATUS_WEBSOCKETS };

const JSON_RPC_TO_HTTP = {};

for ( const status in STATUS_JSON_RPC ) {
    JSON_RPC_TO_HTTP[status] = STATUS_JSON_RPC[status][0];
    STATUS[status] = STATUS_JSON_RPC[status][1];
}

class Result {
    #status;
    #statusText;
    #exception = false;

    constructor ( status, data, props ) {
        this.status = status;
        this.data = data;

        if ( props ) Object.assign( this, props );
    }

    // static
    static get Result () {
        return Result;
    }

    static isResult ( object ) {
        if ( object && typeof object === "object" && ( object instanceof Result || ( "status" in object && "statusText" in object ) ) ) return true;
    }

    static result ( status, data, props ) {
        return new this.prototype.constructor( status, data, props );
    }

    static exception ( status, data, props ) {
        const res = new this.prototype.constructor( status, data, props );

        res.exception = true;

        return res;
    }

    static try ( res ) {
        if ( res === undefined ) {
            return new this.prototype.constructor( 200 );
        }

        // Result object
        else if ( res instanceof Result ) {
            return res;
        }

        // Result-like object
        else if ( this.isResult( res ) ) {
            return new this.prototype.constructor( [res.status, res.statusText] );
        }
        else {
            console.log( Error( `Invalid return value, "Result" object is expected` ) );

            return new this.prototype.constructor( 500 );
        }
    }

    static catch ( e ) {
        var res;

        // Result object
        if ( e instanceof Result ) {
            res = e;
        }

        // Result-like object
        else if ( this.isResult( e ) ) {
            res = new this.prototype.constructor( [e.status, e.statusText] );
        }
        else {
            console.log( e instanceof Error ? e : Error( e ) );

            res = new this.prototype.constructor( 500 );
        }

        res.exception = true;

        return res;
    }

    static parse ( res ) {
        var _res;

        if ( objectIsPlain( res ) ) {
            try {
                _res = new this.prototype.constructor( [res.status, res.status_text] );

                delete res.status;
                delete res.status_text;

                Object.assign( _res, res );
            }
            catch ( e ) {
                console.error( e );

                _res = this.exception( [500, "Invalid API response"] );
            }
        }
        else {
            _res = this.exception( [500, "Invalid API response"] );
        }

        return _res;
    }

    static parseRPC ( msg ) {
        var res;

        try {

            // error
            if ( msg.error ) {
                res = new this.prototype.constructor( [msg.error.code, msg.error.message] );

                if ( msg.data?.exception ) res.exception = true;
            }

            // ok
            else {
                res = this.parse( msg.result );
            }
        }
        catch ( e ) {
            res = new this.prototype.constructor( 500 );
        }

        return res;
    }

    static getHTTPStatus ( status ) {
        if ( status < 100 ) return JSON_RPC_TO_HTTP[status] || 500;

        if ( status in STATUS ) return status;

        if ( status < 100 ) return 400;
        else if ( status >= 100 && status < 200 ) return 100;
        else if ( status >= 200 && status < 300 ) return 200;
        else if ( status >= 300 && status < 400 ) return 300;
        else if ( status >= 400 && status < 500 ) return 400;
        else return 500;
    }

    static getStatusText ( status ) {
        const statusText = STATUS[status];

        if ( statusText ) return statusText;

        if ( status < 100 ) return STATUS[400];
        if ( status >= 100 && status < 200 ) return STATUS[100];
        else if ( status >= 200 && status < 300 ) return STATUS[200];
        else if ( status >= 300 && status < 400 ) return STATUS[300];
        else if ( status >= 400 && status < 500 ) return STATUS[400];
        else return STATUS[500];
    }

    // properties
    get status () {
        return this.#status;
    }

    set status ( status ) {
        if ( typeof status === "number" ) {
            this.#status = status;
            this.statusText = null;
        }
        else if ( Array.isArray( status ) ) {
            if ( typeof status[0] != "number" ) throw Error( `Result status "${status}" is not a number` );

            this.#status = status[0];
            this.statusText = status[1];
        }

        // Result-like object
        else if ( this.constructor.isResult( status ) ) {
            this.#status = status.status;
            this.statusText = status.statusText;
        }
        else {
            throw Error( `Result status "${status}" is not a valid status` );
        }

        // drop exception property
        if ( this.ok ) this.exception = false;
    }

    get statusText () {
        return this.#statusText;
    }

    set statusText ( value ) {
        if ( typeof value !== "string" || value === "" ) {
            this.#statusText = Result.getStatusText( this.#status );
        }
        else {
            this.#statusText = value;
        }
    }

    get exception () {
        return this.#exception;
    }

    set exception ( exception ) {
        if ( this.ok ) {
            this.#exception = false;
        }
        else {
            this.#exception = !!exception;
        }
    }

    // status props
    get ok () {
        return this.#status >= 200 && this.#status < 300;
    }

    get error () {
        return this.#status >= 400 || this.#status < 100;
    }

    get is1xx () {
        return this.#status >= 100 && this.#status < 200;
    }

    get is2xx () {
        return this.#status >= 200 && this.#status < 300;
    }

    get is3xx () {
        return this.#status >= 300 && this.#status < 400;
    }

    get is4xx () {
        return ( this.#status >= 400 && this.#status < 500 ) || this.#status < 100;
    }

    get is5xx () {
        return this.#status >= 500;
    }

    // public
    toString () {
        return `${this.status} ${this.statusText}`;
    }

    toJSON () {
        return Object.assign( {
            "status": this.#status,
            "status_text": this.#statusText,
            "exception": this.#exception,
        },
        this );
    }

    toRPC ( id ) {
        var res;

        if ( !this.ok ) {
            res = {
                "jsonrpc": "2.0",
                "error": {
                    "code": this.#status,
                    "message": this.#statusText,
                    "data": {
                        "exception": this.exception,
                    },
                },
            };
        }
        else {
            res = {
                "jsonrpc": "2.0",
                "result": this,
            };
        }

        if ( id ) res.id = id;

        return res;
    }
}

// make methods readonly
Object.defineProperty( Result.prototype, "toString", {
    "writable": false,
    "value": Result.prototype.toString,
} );

Object.defineProperty( Result.prototype, "toJSON", {
    "writable": false,
    "value": Result.prototype.toJSON,
} );

Object.defineProperty( Result.prototype, "toRPC", {
    "writable": false,
    "value": Result.prototype.toRPC,
} );

const result = Result.result.bind( Result );

Object.setPrototypeOf( result, Result );

export default result;
