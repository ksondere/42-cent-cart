Package.describe({
    summary: "Cart",
    name: "natestrauser:cart",
    summary: "A simple and pluggable shopping cart that uses stripe for payments",
  	version: "0.0.5",
    git: "https://github.com/nate-strauser/meteor-cart.git"
});

Package.on_use(function (api) {
	api.versionsFrom("METEOR@0.9.0");
	Npm.depends({"stripe": "2.8.0", "authorize-net": "1.0.4"});

	api.use([
	    'tracker@1.0.3',
	    'templating',
	    'session',
	    'amplify'
		]
	  , 'client');

	api.use([
		'iron:router@1.0.0', 'mongo@1.0.8', 'underscore', 'accounts-base', 'random', 'meteorhacks:npm', 'meteorhacks:async'
		], ['server','client']);

	
	api.addFiles('lib/stripe/stripe_client.js', 'client');
	api.addFiles('lib/stripe/stripe_checkout.js', 'client');
	api.addFiles('lib/stripe/stripe_server.js', 'server');

    api.addFiles('lib/authorize-net/authnet_server.js', ['server']);

    api.addFiles(['lib/both/environment.js'], ['client','server']);
    api.addFiles(['lib/client/cart.html','lib/client/cart.js'], 'client');
    api.addFiles(['lib/server/publications.js'], 'server');

    api.export('Cart', ['client','server']);
});
