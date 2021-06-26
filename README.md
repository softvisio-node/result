> :information_source: Please, see the full project documentation here: [https://softvisio.github.io/result/](https://softvisio.github.io/result/).

> :warning: Do not edit. This file is generated automatocally by `@softvisio/cli`.

# Introduction

Serializable result object, that encapsulates operation status, statusText and returned data.

## Install

```shell
npm i @softvisio/result
```

Under `node` environment it also register itself as `global.result`, so you don;t need to import it into all modules;

## Usage

<!-- prettier-ignore -->
```javascript
import result from "@softvisio/result";

result(200);

result( [200, "Completed"] ); // custom status text

result( 200, { data } );      // with some data
```

### result( status, data, properties )

-   `status` <integer\> | <Array\> Status code or <Array\> [status code, status text].
-   `data?` <any\> arbitrary Data that represents returned value. This data is accesible via `result.data` property.
-   `properties?` <Object\> Additional meta properties, that will be stored in the result object.
-   Return: <Result\>

Creates new result object.

Example:

<!-- prettier-ignore -->
```javascript
const res = result( 500, { a: 1 }, { meta: "some data" } );

console.log( res.ok );         // false
console.log( res.status );     // 500
console.log( res.statustext ); // internal server error
console.log( res.data );       // {"a": 1}
console.log( res.meta );       // "some data"
```

### result.exception( status, data, properties )

### result.try( res )

-   `res` <any\>
-   Returns: <Result\>

Checks, that `res` is instance of <Result\>. If `res` is:

-   <Result\>: returns `res`;
-   <undefined\>: returns `result( 200 )`;
-   any other value: returns `result( 500 )`;

### result.catch( res )

-   `res` <any\>
-   Returns: <Result\>

Checks, that `res` is instance of <Result\>. If `res` is:

-   <Result\>: returns `res`;
-   any other value: returns `result( 500 )`;

### result.parse( res )

-   `res` <Object\> Result object data, produced by `Result.toJSON()`.
-   Returns: <Result\>

### result.parseRPC( msg )

-   `msg` <Object\> JSON RPC 2.0 message.
-   Returns: <Result\>

Converts JSON RPC response message to the <Result\> object.

### result.getHTTPStatus( status )

-   `status` <integer\> Status code.
-   Returns: <integer\> Status code.

Returns status code in range, supported by `HTTP` protocol.

### result.getStatusText( status )

-   `status` <integer\> Status code.
-   Returns: <string\> Status text.

Resolves status text by the status code.

### Class: Result

#### result.status

-   <integer\> Status code.

#### result.statusText

-   <string\> Status text.

#### result.exception

-   <boolean\> Return `true` if result is exception.

#### result.ok

-   <boolean\> Returns `true` if result is successful, otherwise returns `false`.

#### result.error

-   <boolean\> Return `true` if result is error.

#### result.is1xx

-   <boolean\> Return `true` if result code in range: `100` - `199`.

#### result.is2xx

-   <boolean\> Return `true` if result code in range: `200` - `299`.

#### result.is3xx

-   <boolean\> Return `true` if result code in range: `300` - `399`.

#### result.is4xx

-   <boolean\> Return `true` if result code in range: `400` - `499`.

#### result.is5xx

-   <boolean\> Return `true` if result code >= `500`.

#### result.toString()

-   Returns: <string\>

#### result.toJSON()

-   Returns: <string\>

#### result.toRPC( id )

-   `id` <integer\> JSON RPC message id.
-   Return: <Object\> JSON RPC response.

Converts result object to the JSON RPC response.
