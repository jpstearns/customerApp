var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('customers', ['customers']);
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');

app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

app.get('/customers', function (req, res) {
  console.log('I received a GET request');

  db.customers.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});

app.post('/customers', function(req, res){
	console.log(req.body);
	db.customers.insert(req.body, function(err, doc){
		res.json(doc);
	})
});
app.delete('/customers/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.customers.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
		res.json(doc);
	})
});
app.get('/customers/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.customers.findOne({_id: mongojs.ObjectId(id)}, function (err, doc) {
    res.json(doc);
  });
});

app.put('/customers/:id', function (req, res) {
	console.log(req.body);
  var id = req.params.id;
  db.customers.findAndModify({
    query: {_id: "mongojs.ObjectId(id)"},
    update: {$set: {name: req.body.name, email: req.body.email, phone: req.body.phone,
                    street: req.body.street, city: req.body.city, state: req.body.state, zip: req.body.zip}},
    new: true}, function (err, doc) {
      res.json(doc);
    }
  );
});

$http.listen(process.env.PORT || 3000, function(){
  console.log('listening on', http.address().port);
});