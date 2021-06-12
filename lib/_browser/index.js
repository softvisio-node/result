import status from "#resources/status.js";
import statusWebsockets from "#resources/status-websockets.js";
import statusJSONRPC from "#resources/status-json-rpc.js";

const STATUS = { ...status, ...statusWebsockets, ...statusJSONRPC };

const RPC_TO_HTTP = {};

for ( const rpcStatus in statusJSONRPC ) {
    STATUS[rpcStatus] = statusJSONRPC[rpcStatus][1];
    RPC_TO_HTTP[rpcStatus] = statusJSONRPC[rpcStatus][0];
}

const RESERVED_PROPERTIES = new Set( ["status", "statusText", "exception", "toString", "toJSON"] );

class Result {
    #status;
    #statusText;
    #exception = false;

    constructor ( status, data, props ) {
        this.status = status;
        this.data = data;

        if ( props ) {
            for ( const prop in props ) {
                if ( RESERVED_PROPERTIES.has( prop ) ) throw Error( `Reserved property "${prop}" is used in result constructor` );

                this[prop] = props[prop];
            }
        }
    }

    // static
    static isResult ( object ) {
        if ( object && typeof object === "object" && ( object instanceof Result || ( "status" in object && "statusText" in object ) ) ) return true;
    }

    static result ( status, data, props ) {
        return new this( status, data, props );
    }

    static exception ( status, data, props ) {
        const res = new this( status, data, props );

        res.exception = true;

        return res;
    }

    static try ( res ) {
        if ( res == null ) {
            return new this( 200 );
        }

        // Result object
        else if ( res instanceof Result ) {
            return res;
        }

        // Result-like object
        else if ( this.isResult( res ) ) {
            return new this( [res.status, res.statusText] );
        }
        else {
            console.log( Error( `Invalid return value, "Result" object is expected` ) );

            return new this( 500 );
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
            res = new this( [e.status, e.statusText] );
        }
        else {
            console.log( e instanceof Error ? e : Error( e ) );

            res = new this( 500 );
        }

        res.exception = true;

        return res;
    }

    static parse ( res ) {
        var _res;

        if ( Object.isPlain( res ) ) {
            try {
                _res = new this( [res.status, res.status_text] );

                for ( const prop in res ) {

                    // silently ignore reserved properties
                    if ( !RESERVED_PROPERTIES.has( prop ) ) _res[prop] = res[prop];
                }

                _res.exception = res.exception;
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

    static getStatusText ( status ) {
        const statusText = STATUS[status];

        if ( statusText ) return statusText;

        if ( status >= 100 && status < 200 ) return STATUS[100];
        else if ( status >= 200 && status < 300 ) return STATUS[200];
        else if ( status >= 300 && status < 400 ) return STATUS[300];
        else if ( status >= 400 && status < 500 ) return STATUS[400];
        else return STATUS[500];
    }

    // props
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

    get statusHTTP () {
        return RPC_TO_HTTP[this.#status] || this.#status;
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

    // status props
    get ok () {
        return this.#status >= 200 && this.#status < 300;
    }

    get error () {
        return this.#status >= 400;
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
        return this.#status >= 400 && this.#status < 500;
    }

    get is5xx () {
        return this.#status >= 500;
    }
}

const result = Result.result.bind( Result );

export default result;

Object.defineProperty( result, "Result", { "value": Result } );
Object.defineProperty( result, "exception", { "value": Result.exception.bind( Result ) } );
Object.defineProperty( result, "try", { "value": Result.try.bind( Result ) } );
Object.defineProperty( result, "catch", { "value": Result.catch.bind( Result ) } );
Object.defineProperty( result, "parse", { "value": Result.parse.bind( Result ) } );
Object.defineProperty( result, "getStatusText", { "value": Result.getStatusText.bind( Result ) } );
