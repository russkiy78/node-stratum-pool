var net = require('net');
var events = require('events');

//Gives us global access to everything we need for each hashing algorithm
require('./algoProperties.js');
var pool;

//exports.daemon = require('./daemon.js');
//exports.varDiff = require('./varDiff.js');


exports.createPool = function(poolOptions, authorizeFn, logger){
    if (poolOptions.coin['stratum'] !== undefined) {
        if (poolOptions.coin['stratum'] === 'zcash') {
            console.log("ZCASH!!!");
            pool = require('./zcash/pool.js');
            exports.daemon = require('./zcash/daemon.js');
            exports.varDiff = require('./zcash/varDiff.js');
            console.log(poolOptions);
            var newPool = new pool(poolOptions, authorizeFn, logger);
            return newPool;
        }
    }
    pool = require('./pool.js');
    exports.daemon = require('./daemon.js');
    exports.varDiff = require('./varDiff.js');
    console.log(poolOptions);
    var newPool = new pool(poolOptions, authorizeFn, logger);
    return newPool;
};
