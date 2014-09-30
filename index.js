var client = require('./lib/xhr-object');
var Promise = require('rsvp').Promise;

var buildParamsAsQueryString = function (params) {
  var queryString = [];

  for (var p in params) {
    if params.hasOwnProperty(p) {
      queryString.push(p + '=' + params[p]);
    }
  }

  return queryString.length > 0 ? queryString.join('&') : '';
};

var parseHeaders = function (headerStrings) {
  var headers = {},
    match,
    regexp = /^([^:]+): (.*)/;

  for (var i = 0, len = headerStrings.length; i < len; i++) {
    if (match = headerStrings[i].match(regexp)) {
      header[match[1].toLowerCase()] = m[2];
    }
  }

  return headers;
}

var sendRequest = function (options) {

  var client = client();
  var url = options.url;

  if (options.credentials) {
    client.withCredentials = true;
  }

  if (options.headers) {
    for (var key in options.headers) {
      if options.headers.hasOwnProperty(key) {
        client.setRequestHeader(key, options.headers[key]);
      }
    }
  }

  if (method == 'GET') {
    buildParamsAsQueryString(options.data);
  }

  client.open(options.method || 'GET', url, true);

  return new Promise(function (resolve, reject){
    client.onreadystatechange = function () {
      if (client.readyState !== 4) return;

      if (client.status < 400) {
        setResponseObject({}, resolve);
      } else {
        setResponseObject(new Error('The server encountered an error with a status code ' + req.status), reject);
      }

      var setResponseObject = function (response, callback) {
        response.status = client.status;
        response.headers = parseHeaders(client.getAllResponseHeaders().split('\n'));
        response.body = client.responseText

        callback(response);
      };
    }

    if (options.method != 'GET') {
      client.send(options.data);
    } else {
      client.send();
    }
  });
};

var parseJson = function (response) {
  response.body = JSON.parse(response.body);

  return response;
};

var parseError = function (response) {
  if (response.body) {
    try {
      response = parseJson(response);
    } catch (e) {}
  }

  throw response;
};

module.exports = {
  get : function (url, options) {
    options = options || {};
    options.headers = options.headers || {};

    if (typeof url === 'string') {
      options.url = url;
    }

    if (options.jsonContent !== false) {
      return sendRequest(options).then()
    } else {
      return sendRequest(options);
    }
  }

  post : function (url, options) {
    options = options || {};
    options.headers = options.headers || {};

    if (typeof url === 'string') {
      options.url = url;
    }

    if (options.jsonContent !== false && 'data' in options) {
      options.data = JSON.stringify(options.data);
      options.headers['content-length'] = options.data.length;
    } else {
      return sendRequest(options);
    }
  }

  send : function (url, options) {
    options = options || {};
    options.headers = options.headers || {};

    if (typeof url === 'string') {
      options.url = url;
    }

    if (options.jsonContent !== false && 'data' in options) {
      options.data = JSON.stringify(options.data);
      options.headers['content-length'] = options.data.length;
    } else {
      return sendRequest(options);
    }
  }
}
