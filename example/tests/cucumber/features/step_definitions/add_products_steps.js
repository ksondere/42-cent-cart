(function () {

  'use strict';

  module.exports = function () {

    // You can use normal require here, cucumber is NOT run in a Meteor context (by design)
    var url = require('url');

    this.Given(/^I am an online shopper$/, function () {
      // no callbacks! DDP has been promisified so you can just return it
      //return this.server.call('reset'); // this.ddp is a connection to the mirror
      callback.pending();
    });

    this.When(/^I navigate to "([^"]*)"$/, function (relativePath, callback) {
      // WebdriverIO supports Promises/A+ out the box, so you can return that too
      //this.client. // this.browser is a pre-configured WebdriverIO + PhantomJS instance
       // url(url.resolve(process.env.ROOT_URL, relativePath)). // process.env.ROOT_URL always points to the mirror
       // call(callback);
      callback.pending();
    });

    this.Then(/^I should see the title "([^"]*)"$/, function (expectedTitle, callback) {
      // you can use chai-as-promised in step definitions also
      //this.client.
       // waitForVisible('body *'). // WebdriverIO chain-able promise magic
        //getTitle().should.become(expectedTitle).and.notify(callback);

      callback.pending();
    });

  };

})(); 