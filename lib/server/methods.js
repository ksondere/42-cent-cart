var conf = require('./../authorize-net/config.js');
var assert = require('assert');
var GatewayError = require('42-cent-base').GatewayError;
var SubscriptionPlan = require('42-cent-model').SubscriptionPlan;
var CreditCard = require('42-cent-model').CreditCard;
var Prospect = require('42-cent-model').Prospect;

var service

function randomAmount() {
    return Math.ceil(Math.random() * 300);
}

conf.testMode = true;
service = AuthnetAPI(conf);

var cc = {
    creditCardNumber: '4012888818888',
    expirationYear: '2017',
    expirationMonth: '1',
    cvv: '666'
};


Meteor.methods({
    CartPayForItemsNow: function (token, deviceId) {
        console.log('free at last free at last!')
        this.unblock();
        var items, result;
        if (this.userId)
            items = Cart.Items.find({userId: this.userId});
        else
            items = Cart.Items.find({deviceId: deviceId});

        var total = 0;
        items.forEach(function (item) {
            total += item.price;
        });

        items.forEach(function (item) {
            Cart.Items.remove({_id: item._id});
        });

        service.submitTransaction({amount: total}, cc).then(function (result) {
            console.log(result.authCode);
            console.log(result.transactionId);
            done();
        }).catch(function (err) {
            console.log(err);
        });

        //return result;
    }
});
