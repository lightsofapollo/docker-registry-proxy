#! /usr/bin/env node
console.log(process.argv);

var http = require('http');
var httpProxy = require('http-proxy');

var PORT = 60126;
var REGISTRY_URL = 'https://registry.hub.docker.com';

var httpProxy = require('http-proxy');
var http = require('http');

var args = process.argv.slice(2);

if (args.length < 2 || args[0] === '--help') {
  console.log('Usage: node proxy.js <username> <password>');
  process.exit();
}

var proxy = httpProxy.createProxyServer({});
var credentials = {
  username: args[0],
  password: args[1]
};

// Docker Authentication proxy string
var authentication = new Buffer(JSON.stringify(credentials)).toString('base64');

var server = http.createServer(function(req, res) {
  console.log('request: ', req.url, req.headers);

  // The whole point of this proxy is to simulate credentials without any fancy
  // setups or pushing of images locally... So we only implement the credential
  // checking part of the proxy.
  if (req.headers['x-registry-auth'] !== authentication) {
    console.error('Unauthorized request', req.url, req.headers);
    //res.writeHead(403);
    //res.end();
    //return;
  }

  // Remove headers specific to this proxy...
  delete req.headers['host'];
  delete req.headers['x-registry-auth'];

  // Issue the proxy request to docker hub...
  proxy.web(req, res, { target: REGISTRY_URL });
});

server.listen(PORT);
var port = server.address().port;
