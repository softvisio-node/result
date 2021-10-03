import "#lib/index";

const t = {
    statusOnly () {
        return result( 200 );
    },
    statusText () {
        return result( [200, "Message"] );
    },
    statusTextData () {
        return result( [200, "Message"], { "a": 1 } );
    },
    statusTextDataProps () {
        return result( [200, "Message"], { "a": 1 }, { "a": 1, "b": 2 } );
    },
};

bench( "result", t, 1000000 );
