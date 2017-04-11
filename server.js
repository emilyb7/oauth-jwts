const Hapi = require('hapi');
const Inert = require('inert');
const fs = require('fs');
const jwt2 = require('hapi-auth-jwt2');
const jsonwebtoken = require('jsonwebtoken');

const env = require('env2')('config.env');

const server = new Hapi.Server();

server.connection({
  address: process.env.IP || '0.0.0.0',
  port: process.env.PORT || 7000,
  tls: process.env.NODE_ENV !== 'production' && {
    key : fs.readFileSync('./key.pem'),
    cert : fs.readFileSync('./cert.pem'),
  },
});

const username = "emilyb7";

const validate = (token, request, callback) => {
  if(token.user.name !== username) {
    return callback(null, false);
  } else {
    return callback(null, true);
  }
};

server.register([ Inert, jwt2, ], (err) => {

  if (err) { console.log(err); }

  const strategyOptions = {
    key: process.env.SECRET,
    validateFunc: validate,
    verifyOptions: { algorithms: [ 'HS256' ], },
  };

  server.auth.strategy('jwt', 'jwt', strategyOptions);

  server.route(require('./src/routes.js'));

  server.start(() => { console.log((`Server running at: ${server.info.uri}`)); })

});

module.exports = server;
