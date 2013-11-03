exports.initialize = function( server ) {

    server.error(function( err, req, res, next ){
        if (err instanceof exports.NotFoundError) {
            res.render( '404.jade', {
                status: 404
            } );
        } else {
            res.render( '500.jade', {
                locals: {
                    error: err
                }
                , status: 500
            } );
        }
    });

    //A Route for Creating a 500 Error (Useful to keep around)
    server.get( '/500', function( req, res ){
        throw new Error( 'This is a 500 Error' );
    } );

    server.get( '/', function( req,res ) {
        res.render( 'index.jade', {
            locals : {
                title: 'HackTG'
            }
        });
    } );

//The 404 Route (ALWAYS Keep this as the last route)
    server.get( '/*', function( req, res ){
        throw new exports.NotFoundError;
    } );

}

exports.NotFoundError = function( msg ) {
    this.name = 'NotFound';
    Error.call(this, msg);
    Error.captureStackTrace(this, arguments.callee);
}
