#!/usr/bin/env node

import { suite, test } from "node:test";
import assert from "node:assert";
import "#lib/index";

suite( "result", () => {
    test( "1", () => {
        const res = result( 200 );

        assert.deepEqual( res.toJSON(), {
            "status": 200,
            "status_text": "OK",
            "exception": false,
            "data": undefined,
            "meta": undefined,
        } );
    } );

    test( "2", () => {
        const res = result( 200, "data", { "a": 1, "b": 2 } );

        assert.deepEqual( res.toJSON(), {
            "status": 200,
            "status_text": "OK",
            "exception": false,
            "data": "data",
            "meta": {
                "a": 1,
                "b": 2,
            },
        } );
    } );

    test( "3", () => {
        const res = result( [ 200 ] );

        assert.deepEqual( res.toJSON(), {
            "status": 200,
            "status_text": "OK",
            "exception": false,
            "data": undefined,
            "meta": undefined,
        } );
    } );

    test( "4", () => {
        const res = result( [ 200, "message" ] );

        assert.deepEqual( res.toJSON(), {
            "status": 200,
            "status_text": "message",
            "exception": false,
            "data": undefined,
            "meta": undefined,
        } );
    } );

    test( "5", () => {
        const res = result( [ 200, false ] );

        assert.deepEqual( res.toJSON(), {
            "status": 200,
            "status_text": "OK",
            "exception": false,
            "data": undefined,
            "meta": undefined,
        } );
    } );

    test( "6", () => {
        const _res = result( [ 300, "message" ], "data", { "a": 1, "b": 2 } );

        const res = result( _res );

        assert.deepEqual( res.toJSON(), {
            "status": 300,
            "status_text": "message",
            "exception": false,
            "data": undefined,
            "meta": undefined,
        } );
    } );
} );
