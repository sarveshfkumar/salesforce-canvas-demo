var express = require('express'),
    bodyParser = require('body-parser'),
    decode = require('salesforce-signed-request');

var app = express();

app.use(bodyParser());          // pull information from html in POST

app.get('/', function (req, res) {
    res.render('index.jade', {name: 'Christophe Coenraets'});
});

app.post('/signedrequest', function(req, res) {

    var signedRequest = req.body.signed_request,
        appSecret = process.env.APP_SECRET;

    var sfContext = decode(signedRequest, appSecret);

        var oauthToken = sfContext.client.oauthToken;
        var instanceUrl = sfContext.client.instanceUrl;
//        var warehouseId = sfContext.context.environment.parameters.id //sent as parameters via visualForce parameters

    console.log(oauthToken);
    console.log(instanceUrl);

    res.render('index.jade', {name: 'Christophe Coenraets'});
});

//function processSignedRequest(req, res) {
//    var shipment = new Shipment();
//    try {
//        var json = shipment.processSignedRequest(req.body.signed_request, config.APP_SECRET);
//        res.render("index", json);
//    } catch (e) {
//        res.render("error", {
//            "error": errors.SIGNED_REQUEST_PARSING_ERROR
//        });
//    }
//}

app.set('port', process.env.PORT || 5000);

app.listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});