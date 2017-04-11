const querystring = require('querystring');

module.exports = (request, reply) => {
  const params = {
    client_id: process.env.CLIENT_ID,
    redirect_url: process.env.BASE_URL + '/hello',
  }

  const base = 'https://github.com/login/oauth/authorize?';
  const query = querystring.stringify(params);

  return reply.redirect(base + query);
};
