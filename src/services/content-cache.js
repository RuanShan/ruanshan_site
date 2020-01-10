'use strict';

var config = require( '../config/wordpress' );

// Caching for common requests
var LRU = require( 'lru-cache' );

var cache = LRU({
  max: 50,
  maxAge: config.cacheLimit
});

module.exports = cache;
