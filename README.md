# Docker Registry Proxy

The goal of this proxy is to simulate a docker registry behind registry
authentication (X-Registry-Auth). This makes it easy to test private
registry features without actually using a real private registry and
tagging/pushing layers to it... To test a simple registry pull all is
needed is a public image tagged with the url of the proxy:

i.e. `localhost:$PORXY_PORT/lightsofapollo/docker-registry-proxy`.

This is intended to be used and deployed as a docker image usage as a
standalone node module should be easy but not useful to me at this time.

## Hacking

Modify `server.js` run `docker build`
