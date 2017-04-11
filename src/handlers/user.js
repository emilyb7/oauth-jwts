const Request = require('request');

module.exports = (request, reply) => {

  const credentials = request.auth.credentials;
  const url = 'https://api.github.com/user';

  const options = {
    url: url,
    headers: {
      'User-Agent': 'emilyb7',
      Authorization: 'token ' + credentials.accessToken,
    }
  };

  Request(options, (err, rep, body) => {
    reply(body);
  });
};
