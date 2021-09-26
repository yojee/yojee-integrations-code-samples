const crypto = require('crypto');

// Transform all header keys to lowercase so that we don't have case-related issues
const toLowercaseHeaders = (headers) => {
  let head = {};
  for (const key in headers) {
    if (headers.hasOwnProperty(key)) {
      head[key.toLowerCase()] = headers[key];
    }
  }
  return head;
}

// Expects the incoming request to have a headers key and a body key
// Also expects to receive the secret key for the webhook to create the hash
const isValidWebhook = (request, secret) => {
  const headers = toLowercaseHeaders(request.headers);
  const yojeesignature = headers['yojee-signature'] || '';
  const timestamp = headers['yojee-request-timestamp'] || '';

  const body = request.body;
  const hash = crypto
    .createHmac('sha256', secret)
    .update(timestamp + '.' + body)
    .digest('hex');

  console.log('hash: ', hash);
  return hash.toUpperCase() == yojeesignature.toUpperCase();
};

exports.CommonHelper = {
  isValidWebhook,
};
