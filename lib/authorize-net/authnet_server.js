AuthnetAPI = Npm.require('authorize-net');

function randomAmount() {
    return Math.ceil(Math.random() * 300);
}

Meteor.methods({
    CartPayForItemsNow: function (deviceId) {
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

        var cc = {
            creditCardNumber: '4012888818888',
            expirationYear: '2017',
            expirationMonth: '1',
            cvv: '666'
        };

        console.log('AuthnetAPI: ' + AuthnetAPI);
        console.log('API_LOGIN_ID: ' + Meteor.settings.authNetOptions.API_LOGIN_ID);
        console.log('TRANSACTION_KEY: ' + Meteor.settings.authNetOptions.TRANSACTION_KEY);
        service = AuthnetAPI({
            testMode: true,
            API_LOGIN_ID: Meteor.settings.authNetOptions.API_LOGIN_ID,
            TRANSACTION_KEY: Meteor.settings.authNetOptions.TRANSACTION_KEY
        });

        console.log('service: ' + service);

        var result = Async.runSync(function (done) {
            service.submitTransaction({amount: total}, cc).then(Meteor.bindEnvironment(function (result) {
                console.log(result.authCode);
                console.log(result.transactionId);

                Orders.insert({
                    price: total,
                    authCode: result.authCode,
                    transactionId: result.transactionId,
                    deviceId: deviceId,
                    userId: this.userId,
                    date: Date()
                });
                done(null, 'success');
            })).catch(function (err) {
                console.log(err);
                done(null, 'failed')
            });
            items.forEach(function (item) {
                Cart.Items.remove({_id: item._id});
            });

        });
        return result;
    }
});