Package.describe({
    summary: "shopping cart",
    name: "ksondere:42-cent-cart",
    summary: "A simple and pluggable shopping cart that uses 42-cent npm for payments gateway options",
  	version: "0.0.1",
    git: "https://github.com/ksondere/42-cent-cart.git"
});

Package.on_use(function (api) {
	api.versionsFrom("METEOR@0.9.0");
	Npm.depends({"42-cent": "1.1.0", "authorize-net": "1.0.4"});

	api.use([
	    'tracker@1.0.3',
	    'templating',
	    'session',
	    'amplify'
		]
	  , 'client');

	api.use([
		'iron:router@1.0.0', 'mongo@1.0.8', 'underscore', 'accounts-base', 'random', 'meteorhacks:npm', 'meteorhacks:async', 'materialize:materialize'
		], ['server','client']);

	
    api.addFiles(['lib/server/payments.js'], ['server']);

    api.addFiles(['lib/both/environment.js','lib/both/routes.js'], ['client','server']);
    api.addFiles(['lib/client/cart.html','lib/client/cart.js'], 'client');
    api.addFiles(['lib/server/publications.js'], 'server');

    api.export('Cart', ['client','server']);
});
/*
Velocity package testing does not work well enough to use this yet.
Currently testing using the example code.
Package.onTest(function(api) {
	api.use(['mike:mocha-package@0.5.6', 'practicalmeteor:chai']);
	api.use('ksondere:42-cent-cart');
	api.addFiles('tests/server/42-cent-cart.js', 'server');
	api.addFiles('tests/client/42-cent-cart.js', 'client');
});
*/
