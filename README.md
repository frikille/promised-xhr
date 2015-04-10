# Promised XHR

A small client-side XHR abstraction with promises.

## API
```javascript
XHR.get(url, options)
XHR.post(url, options)
XHR.send(url, options)
```

## Examples

1. Sending a GET request
```javascript
  var XHR = require('promised-xhr');

  XHR.get('/test-url', {
    data: {
      param: 'value'
    },
    headers: {
      'Header-name': 'Header value'
    }
  })
  .then(function (response) {
    console.log('Success handler');
    console.log('The response JSON obejct', response.body);
  })
  .catch(function(response) {
    console.log('Error handler')
  });
```

2. Sending a POST request
```javascript
  var XHR = require('promised-xhr');

  XHR.post('/test-url', {
    data: {
      param: 'value'
    },
    headers: {
      'Header-name': 'Header value'
    }
  })
  .then(function (response) {
    console.log('Success handler');
    console.log('The response JSON obejct', response.body);
  })
  .catch(function(response) {
    console.log('Error handler')
  });
```

3. Sending a request with any method
```javascript
  var XHR = require('promised-xhr');

  XHR.send('/test-url', {
    method: 'PUT',
    data: {
      param: 'value'
    },
    headers: {
      'Header-name': 'Header value'
    }
  })
  .then(function (response) {
    console.log('Success handler');
    console.log('The response JSON obejct', response.body);
  })
  .catch(function(response) {
    console.log('Error handler')
  });
```
