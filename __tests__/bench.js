import "#lib/index";

const t = {
    status_only () {
        return result( 200 );
    },
    status_reason () {
        return result( [200, "Reason"] );
    },
    status_reason_data () {
        return result( [200, "Reason"], { "a": 1 } );
    },
    status_reason_data_props () {
        return result( [200, "Reason"], { "a": 1 }, { "a": 1, "b": 2 } );
    },
};

bench( t, 1000000 );
