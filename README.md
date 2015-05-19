42-cent-cart
===========

A simple shopping cart package for meteorjs that uses 42-cent npm to provide payment gateway options   

Available payment gateways will be:

Authorize.net
Braintree
NMI
Omise
Payflow
RocketGate
Stripe
VirtualMerchant

Run the example app by going into the example directory and running `meteor`

42-cent-cart is derived from nstrausser:cart

Live demo at http://42-cent-cart.meteor.com

------

messy notes below....

Exports `Cart` object

creates a collection that is accessible at `Cart.Items`
Cart.Items must have a `price` field


Session vars that are set for you
`cart-itemCount`
`cart-itemTotal`


amplify is used to generate and deviceId (in session as `cart-deviceId`) - if there is no logged in user, the items added to the cart are attached to the device - if there is a logged in user, the items are attached to the user -- if items are added to the cart as a non-logged in user, then the user logs in, the item attachment is moved from the device to the user

eg:
not logged in
item = 
{
deviceId:"XXXX"
}

logged in
item 
{
userId:"XXXX"
}

when a user logs in, any items that have a matching deviceId but no userId have the deviceId removed and and a userId added




TODO:
using accounting.js to format money
callback for what to do after payment
option to adjust what to do with items after payemnt (instead of just delete)
add cart preview route
adjust quantity
remove items from cart
bootstrap styling by default