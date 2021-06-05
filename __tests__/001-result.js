import "#lib/index";

test( "1", () => {
    const res = result( 200 );

    expect( res.toJSON() ).toStrictEqual( {
        "status": 200,
        "reason": "OK",
        "exception": false,
        "data": undefined,
    } );
} );

test( "2", () => {
    const res = result( 200, "data", { "a": 1, "b": 2 } );

    expect( res.toJSON() ).toStrictEqual( {
        "status": 200,
        "reason": "OK",
        "exception": false,
        "data": "data",
        "a": 1,
        "b": 2,
    } );
} );

test( "3", () => {
    const res = result( [200] );

    expect( res.toJSON() ).toStrictEqual( {
        "status": 200,
        "reason": "OK",
        "exception": false,
        "data": undefined,
    } );
} );

test( "4", () => {
    const res = result( [200, "reason"] );

    expect( res.toJSON() ).toStrictEqual( {
        "status": 200,
        "reason": "reason",
        "exception": false,
        "data": undefined,
    } );
} );

test( "5", () => {
    const res = result( [200, false] );

    expect( res.toJSON() ).toStrictEqual( {
        "status": 200,
        "reason": "OK",
        "exception": false,
        "data": undefined,
    } );
} );

test( "6", () => {
    const _res = result( [300, "reason"], "data", { "a": 1, "b": 2 } );

    const res = result( _res );

    expect( res.toJSON() ).toStrictEqual( {
        "status": 300,
        "reason": "reason",
        "exception": false,
        "data": undefined,
    } );
} );
