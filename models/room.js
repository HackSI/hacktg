var Player = require( './player' ).Player;

var room_count = 0;

var Room = function() {

    this.id = ++room_count;
    this.players = [null, null];

}

/*
    Add a player to the room
 */
Room.prototype.addPlayer = function( player ) {

    if ( this.players[ 0 ] && this.players[ 1 ] ) {
        throw new Error( 'Room is full' );
    }

    if ( this.players[ 0 ] != null ) {
        this.players[ 1 ] = player;
    } else {
        this.players[ 0 ] = player;
    }

    console.log( player.get( 'name' ) + ' joined room #' + this.id );

    player.room = this;

}

/*
    Remove a player from play in the room
 */
Room.prototype.removePlayer = function( player ) {

    var players = this.players;

    players.forEach( function(room_player, key) {
        if ( player == room_player ) {
            players[ key ] = null;
        }
    } );

    console.log( player.get( 'name' ) + ' left room #' + this.id );

    player.room = null;

}

/*
    Get a list of players that exist in the room
 */
Room.prototype.getPlayers = function() {

    return this.players.filter( function( player ) {
        return player;
    } );

}

/*
    Return the player object of the opponent of player
 */
Room.prototype.getOpponent = function( player ) {

    var opponent = null;

    this.players.forEach( function( room_player ) {
        if ( player != room_player) {
            opponent = room_player;
        }
    } );

    return opponent;

}

/*
    Return the players seat number
 */
Room.prototype.getPosition = function( player ) {

    var position = null;

    this.players.forEach( function( room_player, key ) {
        if ( player == room_player) {
            position = key;
        }
    } );

    return position;

}

exports.Room = Room;