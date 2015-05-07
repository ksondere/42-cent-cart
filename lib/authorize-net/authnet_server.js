AuthnetAPI = Npm.require('authorize-net');

Meteor.methods({
    CartPayForItems: function (order, deviceId) {
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


        console.log('AuthnetAPI: ' + AuthnetAPI);
        console.log('API_LOGIN_ID: ' + Meteor.settings.authNetOptions.API_LOGIN_ID);
        console.log('TRANSACTION_KEY: ' + Meteor.settings.authNetOptions.TRANSACTION_KEY);
        service = AuthnetAPI({
            testMode: true,
            API_LOGIN_ID: Meteor.settings.authNetOptions.API_LOGIN_ID,
            TRANSACTION_KEY: Meteor.settings.authNetOptions.TRANSACTION_KEY
        });

        var result = Async.runSync(function (done) {
            service.submitTransaction({amount: total}, order.cc).then(Meteor.bindEnvironment(function (result) {
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
                done(false, 'payment succeeded');
            })).catch(function (err) {
                console.log(err);
                done(true, 'payment failed')
            });

        });
        if (!result.err) {
            items.forEach(function (item) {
                Cart.Items.remove({_id: item._id});
            });
        }
        return result;
    }
});