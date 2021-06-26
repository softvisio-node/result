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

-   `status` <integer\> | <Array\> status code or <Array\> status code, status text.
-   `data?` <any\> arbitrary data that represents returned value. this data is accesible via `result.data` property.
-   `properties?` <Object\> additional meta properties, that will be stored in the result object.

creates new result object.

example:

<!-- prettier-ignore -->
```javascript
const res = result( 500, { a: 1 }, { meta: "some data" } );

console.log( res.ok );         // false
console.log( res.status );     // 500
console.log( res.statustext ); // internal server error
console.log( res.data );       // {"a": 1}
console.log( res.meta );       // "some data"
```

### status

-   <integer\> Status code.

### statusText

-   <string\> Status text.

### exception

-   <boolean\> Return `true` if result is exception.

### ok

-   <boolean\> Returns `true` if result is successful, otherwise returns `false`.

### error

-   <boolean\> Return `true` if result is error.

### is1xx

-   <boolean\> Return `true` if result code in range `100` - `199`.

### is2xx

-   <boolean\> Return `true` if result code in range `200` - `299`.

### is3xx

-   <boolean\> Return `true` if result code in range `300` - `399`.

### is4xx

-   <boolean\> Return `true` if result code in range `400` - `499`.

### is5xx

-   <boolean\> Return `true` if result code >= `500`.

### toRPC( id )

-   `id` <integer\> JSON RPC message id.
-   Return: <Object\> JSON RPC response.

Converts result object to the JSON RPC response.
