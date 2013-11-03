/* Author: YOUR NAME HERE
*/

socket = null;

$(document).ready(function() {   

    socket = io.connect( null, { 'auto connect': false } );

    socket.on( 'started', function( data ) {

        console.log( 'Started' );

        socket.emit( 'join', 2, function( err, resp ) {
            console.log( resp );
        } )

    } );

    socket.on( 'relay', function( a ) {
        console.log( 'Relayed data received: a' )
    } );

    socket.socket.connect();

});