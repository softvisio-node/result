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
result(200);

result( [200, "Completed"] ); // custom status text

result( 200, { data } );      // with some data
```

## Properties

### ok

Returns `true` if result is successful, otherwise returns `false`.

### status

Integer status code.

### statusText

Status text.

## Methods

### result( status, data, properties )

Creates new result object.

**Parameters**

-   `status`, one of:

    -   status code - integer status code;
    -   [status code, statusText] - status code with custom status text.

    If `statusText` is not provided it will be resolved and set automatically accordin to the standard HTTP statuses.

-   `data` - arbitrary data that represents returned value. This data is accesible via `result.data` property.
-   `properties` - object, additional meta properties, that will be stored in result object.

Example:

<!-- prettier-ignore -->
```javascript
const res = result( 500, { a: 1 }, { meta: "some data" } );

console.log( res.ok );         // false
console.log( res.status );     // 500
console.log( res.statusText ); // Internal Server Error
console.log( res.data );       // {"a": 1}
console.log( res.meta );       // "some data"
```
