/**
 *
 * Created by ksondere on 5/19/15.
 */
if (PaymentGateways.find({}).count() === 0) {
    PaymentGateways.insert({
        name: 'Authorize.Net',
        credentials: {
            testMode: true,
            "API_LOGIN_ID": "2msN9nrBG8K",
            "TRANSACTION_KEY": "43jNykM6kC8v87Nb"
        },
        selected:  true
    });
    PaymentGateways.insert({
        name: 'NMI',
        credentials: {
            testMode: true,
            "API_LOGIN_ID": "",
            "TRANSACTION_KEY": ""
        },
        selected: false
    });
    PaymentGateways.insert({
        name: 'PayFlow',
        credentials: {
            testMode: true,
            "API_LOGIN_ID": "",
            "TRANSACTION_KEY": ""
        },
        selected: false
    });
    PaymentGateways.insert({
        name: 'RocketGate',
        credentials: {
            testMode: true,
            "API_LOGIN_ID": "",
            "TRANSACTION_KEY": ""
        },
        selected: false
    });
    PaymentGateways.insert({
        name: 'VirtualMerchant',
        credentials: {
            testMode: true,
            "API_LOGIN_ID": "",
            "TRANSACTION_KEY": ""
        },
        selected: false
    });
}
