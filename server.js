var connect = require( 'connect' )
    , inflector = require( 'inflector' )
    , express = require( 'express' )
    , port = ( process.env.PORT || 8081 )
    , database = require( './database' );

var server = express.createServer();
server.configure( function() {

    server.set( 'views', __dirname + '/views' );
    server.set( 'view options', { layout: false } );
    server.use( connect.bodyParser() );
    server.use( express.cookieParser() );
    server.use( express.session( { secret: "dGhpcyBpcyBIQUNLU0kgMjAxMw=="} ) );
    server.use( connect.static( __dirname + '/static' ) );
    server.use( server.router );

} );

database.initDatabase(
    process.env.DATABASE_NAME || 'hacktg'
    , process.env.DATABASE_USER || 'hacktg'
    , process.env.DATABASE_PASS || null
);

require( './models.js' ).initialize( './models' );
require( './socket.js' ).initialize( server );
require( './routes.js' ).initialize( server );

server.listen( port );

console.log('Listening on http://0.0.0.0:' + port );
