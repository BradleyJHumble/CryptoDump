const Gdax = require('gdax');
const CronJob = require('cron').CronJob;
const key = ''; // log into your gdax/colinbase pro account for this info
const secret = ''; // log into your gdax/colinbase pro account for this info
const passphrase = ''; // log into your gdax/colinbase pro account for this info
const apiURI = 'https://api.gdax.com'; // live api end point
const sandboxURI = 'https://api-public.sandbox.gdax.com'; // demo api end point
const authedClient = new Gdax.AuthenticatedClient(
  key,
  secret,
  passphrase,
  apiURI // if you want to demo use 'sandboxURI' instead, highly recommend demo first!
);

var Schedule = new CronJob('* * * * * * *', function() {// Executes code inside every second
  authedClient.getAccounts().then(data => {
      // data is key term for response
      // Change the number for other crypto. Go to your api end point for current available options
      console.log(data);
       global.accountBTCamt = data[1].available; // globals are ugly but it fixed a error
      console.log(accountBTCamt);
      if (global.accountBTCamt > 0.001) { // coinbase pro's floor sell limit. Must be over amt

        const sellParams = {
          type: 'market', // will be filled immediately at availabile prices
          size: global.accountBTCamt, // BTC amount from initial response
          product_id: 'BTC-USD', // can be changed to sell other crypto, change array number above to corresponding crypto
        };

          authedClient.sell(sellParams); 

      }
    })
    .catch(error => {
      // handle the error
    console.log(error); // if error consoles error
    });

}, null, true, 'America/New_York'); // time can be adjusted, but it runs every second so not important unless you want to customize it
