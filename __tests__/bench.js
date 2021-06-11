import "#lib/index";

const t = {
    status_only () {
        return result( 200 );
    },
    status_text () {
        return result( [200, "Message"] );
    },
    status_text_data () {
        return result( [200, "Message"], { "a": 1 } );
    },
    status_text_data_props () {
        return result( [200, "Message"], { "a": 1 }, { "a": 1, "b": 2 } );
    },
};

bench( "result", t, 1000000 );
