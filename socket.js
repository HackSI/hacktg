var socketio = require( 'socket.io' )
    , models = require( './models' );

exports.initialize = function( server ) {

    var io = socketio.listen( server )
        , player_count = 0;

    models.Player.findAll( { limit: 1, order: 'id DESC' } ).success( function( players ) {

        if ( players[ 0 ] ) {
            player_count = players[ 0 ].get( 'id' );
        }
        io.sockets.on( 'connection', function( socket ) {

            var player = models.Player.create( {

                name: 'Player ' + ++player_count

            } )
            .success( function( player ) {

                console.log( player.get( 'name' ) + ' joined the server' );

                socket.emit( 'started', {
                    player: player,
                    rooms: models.rooms
                } );

                player.socket = socket;

                socket.on( 'join', function( room_id, callback ) {

                    var room = models.rooms[ room_id ];

                    if ( !room ) {
                        return callback && callback( true, 'Room does not exist' );
                    }

                    if ( player.room ) {
                        player.room.removePlayer( player );
                    }

                    try {
                        room.addPlayer( player );
                    } catch( e ) {
                        return callback && callback( true, 'Failed to join room: ' + e );
                    }

                    return callback( false, {
                        opponent: room.getOpponent( player )
                        , position: room.getPosition( player )
                    } );

                } );

                socket.on( 'leave', function( callback ) {

                    if ( player.room ) {

                        player.room.removePlayer( player );

                    }

                    callback( false );

                } );

                socket.on( 'relay', function( options, callback ) {

                    if ( !player.room ) {
                        return callback && callback(true, 'Player is not part of a room')
                    }

                    player.room.getPlayers().forEach( function( room_player ) {

                        if ( room_player.socket && room_player != player ) {
                            room_player.socket.emit( 'relay', options );
                        }

                    } );

                    callback && callback(false);

                } );

                socket.on( 'room_list', function( callback ) {

                    callback( false, models.rooms )

                } );

                socket.on( 'disconnect', function() {

                    if ( player.room ) {

                        player.room.removePlayer( player );

                    }

                } );

            } );

        } );

    } );

}
