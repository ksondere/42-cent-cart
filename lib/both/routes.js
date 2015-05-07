Router.route('/cart', function () {
    this.render('CartItems', {
        data: function () {
            var query = {};
            if (Meteor.userId())
                query.userId = Meteor.userId();
            else
                query.deviceId = Session.get('Cart-deviceId');

            return {
                items: Cart.Items.find(query),
                hasItems: !Session.equals('Cart-itemCount', 0),
                itemCount: Session.get('Cart-itemCount'),
                itemTotal: Session.get('Cart-itemTotal')
            };
        }
    });
});


