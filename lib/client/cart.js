Cart.subscriptionHandles = {
    userOrders: Meteor.subscribe("Cart-userOrders")
};

Tracker.autorun(function () {
    if (!Session.equals('Cart-deviceId', undefined))
        Cart.subscriptionHandles.deviceOrders = Meteor.subscribe("Cart-deviceOrders", Session.get('Cart-deviceId'));
});

Tracker.autorun(function () {
    if (!Meteor.userId() && Session.equals('Cart-deviceId', undefined)) {
        var deviceId = amplify.store("Cart-deviceId");
        if (!deviceId) {
            deviceId = Random.id();
            amplify.store("Cart-deviceId", deviceId);
        }
        Session.set('Cart-deviceId', deviceId);
    } else if (Meteor.userId()) {
        Cart.Items.find({
            userId: {$exists: false},
            deviceId: Session.get('Cart-deviceId')
        }, {fields: {userId: 1, deviceId: 1}}).forEach(function (order) {
            Cart.Items.update({
                _id: order._id
            }, {
                $set: {userId: Meteor.userId()},
                $unset: {deviceId: 1}
            }, function (error) {
                if (error)
                    console.log(error);
            });
        });
        Session.set('Cart-deviceId', undefined);
    }
});

Session.setDefault('Cart-itemCount', 0);
Session.setDefault('Cart-itemTotal', 0);
Tracker.autorun(function () {
    var query = {};
    if (Meteor.userId())
        query.userId = Meteor.userId();
    else
        query.deviceId = Session.get('Cart-deviceId');

    var total = 0;
    var items = Cart.Items.find(query, {fields: {price: 1}});
    items.forEach(function (item) {
        total += item.price;
    });

    Session.set('Cart-itemTotal', Math.floor(total * 100) / 100);
    Session.set('Cart-itemCount', items.count());
});

Template.CartAddItemButton.events({
    'click .add-item': function (event, template) {
        event.preventDefault();

        //TODO - need to take an attribute hash and send in all values
        var item = this;
        if (item._id) {
            item.productId = item._id;
            delete item._id;
        }
        if (!Meteor.userId()) {
            item.deviceId = Session.get('Cart-deviceId');
        } else {
            item.userId = Meteor.userId();
        }

        Cart.Items.insert(item);
    }
});

Template.CartSummary.helpers({
    'itemCount': function () {
        return Session.get('Cart-itemCount');
    },
    'itemTotal': function () {
        return Session.get('Cart-itemTotal');
    },
    'itemsInCart': function () {
        return !Session.equals('Cart-itemCount', 0);
    },
    'salesTotal': function () {
        return Orders.findOne({deviceId: Session.get('Cart-deviceId')}).price;
    }
});

Template.CartCreditCardInfo.onRendered(function () {
    $('select').material_select();
});

Template.CartCreditCardInfo.events({
    'click #pay-now': function (event, template) {
        event.preventDefault();

        var creditCardName = document.getElementById("cc-name");
        var creditCardNumber = document.getElementById("cc-number");
        var expirationYear = document.getElementById("cc-exp-year");
        var expirationMonth = document.getElementById("cc-exp-month");
        var cvv = document.getElementById("cc-cvv");

        var cc = {
            creditCardNumber: creditCardNumber.value,
            expirationYear: expirationYear.value,
            expirationMonth: expirationMonth.value,
            cvv: cvv.value
        };
        /*
         var cc = {
         creditCardNumber: '4012888818888',
         expirationYear: '2017',
         expirationMonth: '1',
         cvv: '666'
         };
         */
        order = {
            cc: cc
        }

        Meteor.call("CartPayForItems", order, Session.get('Cart-deviceId'), function (error, result) {
            if (error) {
                alert(JSON.stringify(error));
            } else {
                alert("Payment Complete: " + result.result);
            }
        })
    }
});

Template.CartItem.events({
    'click .remove': function (event, template) {
        event.preventDefault();
        Cart.Items.remove({_id: this._id});
    }
});
