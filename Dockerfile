FROM lightsofapollo/ubuntu-node

COPY . /proxy
RUN cd /proxy && npm install

EXPOSE 60126
ENTRYPOINT ["/proxy/proxy.js"]
