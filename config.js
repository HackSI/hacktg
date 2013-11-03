var fs = require( 'fs' )
    , environment = process.env.NODE_ENV || 'development'
    , cache = {};


var get = function( filename ) {

    try {
        json = readFile( filename );
    } catch( e ) {
        console.log( 'Couldn\'t read config: ' + filename );
        return null;
    }

    return JSON.parse( json )[ environment ];

}

var readFile = function( filename ) {
    if ( cache[ filename ] ) {
        return cache[ filename ];
    }

    return cache[ filename ] = fs.readFileSync( filename );;
}

exports.get = get;