**Please, see full project documentation here:** [https://softvisio.github.io/result/](https://softvisio.github.io/result/)

## Overview

Serializable result object, that encapsulates operation status, reason and returned data.

## Install

```
npm i @softvisio/result
```

Under `node` environment it also register itself as `global.result`, so you don;t need to import it into all modules;

## Synopsis

```js
result(200);

result([200, "Completed"]); // custom reason

result(200, { data }); // with some data
```

## Properties

### ok

Returns `true` if result is successful, otherwise returns `false`.

## Methods

### consttructor( status, data, properties )

Creates new result object.
