const test = require("tape");
const server = require('../server.js');

test("'/' returns 200 statusCode", t => {
    server.inject({ method: 'GET', url: '/' }, res => {
        t.equal(res.statusCode, 200, 'page loaded successfully');
        server.stop();
        t.end();
    });
});

test("'/styles/main.css' returns 200 statusCode", t => {
    server.inject({ method: 'GET', url: '/styles/main.css' }, res => {
        t.equal(res.statusCode, 200, 'static file retrieved');
        server.stop();
        t.end();
    });
});
