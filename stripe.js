const Stripe = require('stripe');
const stripe_client = Stripe('sk_test_aAVzbVTLR3bEykkpytVBXrcY00pO3sV029');
const stripe_dev = Stripe('sk_test_51EnNn1KTNU4MZ2lP1B8sQbqZdEfi1WKaCJ82FzrlAlDxxspVWOuqWPWN5N91E43IU8e5qPLPKBUaLLyTLEQ8QdMU00GGyf8C74');
stripe_dev.balance.retrieve(function(err, balance) {
  // asynchronously called\
  console.log(balance);
});