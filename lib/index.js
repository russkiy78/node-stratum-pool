var net = require('net');
var events = require('events');

//Gives us global access to everything we need for each hashing algorithm
require('./algoProperties.js');
var pool;

exports.daemon = function() {};
exports.varDiff = function() {};

exports.bindreq = function(option = '') {
    this.daemon = require('./'+option+'daemon.js');
    this.varDiff = require('./'+option+'varDiff.js');
}

exports.createPool = function(poolOptions, authorizeFn, logger){
    if (poolOptions.coin['stratum'] !== undefined) {
        if (poolOptions.coin['stratum'] === 'zcash') {
            console.log("ZCASH!!!");
            pool = require('./zcash/pool.js');
            this.bindreq('zcash/');
            var newPool = new pool(poolOptions, authorizeFn, logger);
            return newPool;
        }
    }
    pool = require('./pool.js');
    this.bindreq('');
    var newPool = new pool(poolOptions, authorizeFn, logger);
    return newPool;
};

