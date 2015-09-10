var XHR  = require('../index.js');

XHR.base = '//127.0.0.1'; // optional for external host
var url = '/promised-xhr-endpoint';

logResponse = function (response) {
  console.log(response.body);
};

window.getExample = function () {
  XHR.get(url, {
    data: {
      foo: 'bar'
    }
  }).then(logResponse);
};

window.postExample = function () {
  XHR.post(url, {
    data: {
      foo: 'bar'
    }
  }).then(logResponse);
};

window.sendExampleWithGet = function () {
  XHR.send(url, {
    method: 'GET',
    data: {
      foo: 'bar'
    }
  }).then(logResponse);
};

window.sendExampleWithPost = function () {
  XHR.send(url, {
    method: 'POST',
    data: {
      foo: 'bar'
    }
  }).then(logResponse);
};

window.sendExampleWithPut = function () {
  XHR.send(url, {
    method: 'PUT',
    data: {
      foo: 'bar'
    }
  }).then(logResponse);
};

window.fileUpload = function (input) {
  var file = input.files[0];

  XHR.sendFormData(url, {
    data: {
      file: file,
      foo: 'bar'
    }
  }).then(logResponse);
};

window.submitFormViaXHR = function (form) {
  var formData = new FormData(form);

  XHR.sendFormData(url, {
    formData: formData
  }).then(logResponse);
};
