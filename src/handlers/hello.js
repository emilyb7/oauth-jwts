const querystring = require('querystring');
const Request = require('request');
const jwt = require('jsonwebtoken');

module.exports = (request, reply) => {
  const url = 'https://github.com/login/oauth/access_token?';
  const requestParams = request.url.path.split('?')[1];
  const code = querystring.parse(requestParams).code;

  const params = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: code,
    redirect_uri: process.env.BASE_URL + '/hello',
  };

  const headers = {
    'User-Agent': 'emilyb7',
  }

  const options = {
    url: url,
    form: params,
    headers: headers,
  };

  Request.post(options, (postErr, _, postBody) => {

    if (postErr) {
      console.log(postErr);
    }

    const accessToken = querystring.parse(postBody).access_token;
    const getUrl = 'https://api.github.com/user';
    const getOptions = {
      url: getUrl,
      headers: Object.assign(
        {},
        headers, {
          Authorization: 'token ' + accessToken,
        }),
      };

      Request(getOptions, (getErr, _, getBody) => {
        if (getErr) {
          console.log(getErr);
        }

        const data = JSON.parse(getBody);

        const userData = {
          id: data.id,
          name: data.login,
          avatar: data.avatar_url,
        };

        // JWT stuff

        const jwtOptions = {
          expiresIn: Date.now() + (24 * 60 * 60 * 1000),
          subject: 'github_data',
        };

        const jwtPayload = {
          user: userData,
          accessToken: accessToken,
        }

        const config = {
          ttl: 365 * 24 * 60 * 60 * 1000,
          path: '/',
          isSecure: process.env.NODE_ENV === 'PRODUCTION',
        };

        jwt.sign(jwtPayload, process.env.SECRET, jwtOptions, (jwtErr, token) => {
          if (jwtErr) {
            console.log(jwtErr);
          }
          reply(userData)
            .state('token', token, config);
        });
      });
    });
  }
