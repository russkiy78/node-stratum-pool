var net = require('net');
var events = require('events');

//Gives us global access to everything we need for each hashing algorithm
require('./algoProperties.js');
var pool;

exports.daemon = function() {};
exports.varDiff = function() {};

exports.createPool = function(poolOptions, authorizeFn, logger){
    if (poolOptions.coin['stratum'] !== undefined) {
        if (poolOptions.coin['stratum'] === 'zcash') {
            pool = require('./zcash/pool.js');
            this.daemon = require('./zcash/daemon.js');
            this.varDiff = require('./zcash/varDiff.js');
            var newPool = new pool(poolOptions, authorizeFn, logger);
            return newPool;
        }
    }
    pool = require('./pool.js');
    this.daemon = require('./daemon.js');
    this.varDiff = require('./varDiff.js');
    var newPool = new pool(poolOptions, authorizeFn, logger);
    return newPool;
};

