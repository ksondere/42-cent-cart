Gateways = Npm.require('42-cent');

Meteor.methods({
    CartPayForItems: function (order, deviceId) {
        this.unblock();

        var items;

        if (this.userId)
            items = Cart.Items.find({userId: this.userId});
        else
            items = Cart.Items.find({deviceId: deviceId});

        var total = 0;
        items.forEach(function (item) {
            total += item.price;
        });

        var gateway = PaymentGateways.findOne({ selected: true });

        console.log('API_LOGIN_ID: ' + gateway.credentials.API_LOGIN_ID);
        console.log('TRANSACTION_KEY: ' + gateway.credentials.TRANSACTION_KEY);

        var service = Gateways.use(gateway.name, gateway.credentials);

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
        if (!result.error) {
            items.forEach(function (item) {
                Cart.Items.remove({_id: item._id});
            });
        }
        return result;
    }
});