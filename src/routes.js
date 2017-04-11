const home = require('./handlers/home.js');
const login = require('./handlers/login.js');
const hello = require('./handlers/hello.js');
const user = require('./handlers/user.js');
const secure = require('./handlers/secure.js');

module.exports = [
   { method: 'GET', path: '/', handler: home },
   { method: 'GET', path: '/login', handler: login, },
   { method: 'GET', path: '/hello', handler: hello, },
   { method: 'GET', path: '/user', handler: user, config: { auth: 'jwt', }, },
   { method: 'GET', path: '/secure', handler: secure, config: { auth: 'jwt', }, },
   { method: 'GET', path: '/{file*}', handler: { directory: { path: 'public/' } } },
];
