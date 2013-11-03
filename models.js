var path = require( 'path' );

exports.rooms = [];

exports.initialize = function( dir ) {

    /*
        Autoload each model and make it local to models. This allows models to be
        accessed simply through models instead of requiring each model one by one.
     */
    var glob = require( 'glob' );

    files = glob.sync( dir + '/**.js', {} );
    files.forEach(function( file ) {

        var model_name = path.basename( file, path.extname( file ) ).camelize();

        exports[ model_name ] = require( file )[ model_name ]

        console.log( 'Autoloading model: ' + model_name );

    } );

    /*
        Autocreate rooms that can be joined by players
     */
    var room_count = 5;
    for( var i = 0; i < room_count; i ++ ) {

        console.log( 'Creating room #' + i );

        exports.rooms.push( new exports.Room() );

    }

}
