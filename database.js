var Sequelize = require( 'sequelize-postgres' ).sequelize
    , db = null
    , config = require( './config' ).get( 'config/config.json' );

console.log( config )
exports.initDatabase = function(  ) {

    db = new Sequelize( config.database, config.username, config.password, {
        dialect: config.dialect
        , host: config.host
        , omitNull: true
    } );

}

exports.getDatabase = function() {

    if ( !db ) {
        throw new Error( 'Database has not been initialized' );
    }

    return db;

}