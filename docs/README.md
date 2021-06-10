# Introduction

Serializable result object, that encapsulates operation status, reason and returned data.

## Install

```shell
npm i @softvisio/result
```

Under `node` environment it also register itself as `global.result`, so you don;t need to import it into all modules;

## Usage

```js
result(200);

result([200, "Completed"]); // custom reason

result(200, { data }); // with some data
```

## Properties

### ok

Returns `true` if result is successful, otherwise returns `false`.

### status

Integer status code.

### reason

Status text.

## Methods

### result( status, data, properties )

Creates new result object.

**Parameters**

-   `status`, one of:

    -   status code - integer status code;
    -   [status code, reason] - status code with custom reason.

    If reason is not provided it will be resolved and set automatically accordin to the standard HTTP status reasons.

-   `data` - arbitrary data that represents returned value. This data is accesible via `result.data` property.
-   `properties` - object, additional meta properties, that will be stored in result object.

Example:

<!-- prettier-ignore -->
```js
const res = result(500, { a: 1 }, { meta: "some data" });

console.log(res.ok);     // false
console.log(res.status); // 500
console.log(res.reason); // Internal Server Error
console.log(res.data);   // {"a": 1}
console.log(res.meta);   // "some data"
```
