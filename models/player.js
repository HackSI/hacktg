var db = require( '../database' ).getDatabase()
    , s = require( 'sequelize' );

var Player = db.define( 'Player', {
    id: { type: s.INTEGER, autoIncrement: true, primaryKey: true }
    , name: s.STRING
} );

exports.Player = Player;