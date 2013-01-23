var winston = require('winston');
var logger = new (winston.Logger)({
    transports: [
      new (winston.transports.Console)(),
      new (winston.transports.File)({ filename: 'server.log' })
    ]
  });

exports.logger=logger;

function writeRes(res, payload){
	
  res.write(payload );
  return;
}


function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }

    return true;
}

endRequestProcess=function endRequestProcess( response,message ) {
	
	logger.log('debug', 'endRequestProcess.....');
	response.useChunkedEncodingByDefault = false;
	response.write(message);
	response.write("\n");
	response.writeHead( 200, { 'Content-Type': 'application/json'} );
	response.end();
}

exports.writeRes = writeRes;
exports.isEmpty = isEmpty;
exports.endRequestProcess = endRequestProcess;