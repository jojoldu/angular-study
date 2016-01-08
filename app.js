/**
 * Created by jojoldu@gmail.com on 2015-11-20.
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + '/public/html/index.html'));
});

app.get('/hello', function(req, res){
    res.sendFile(path.join(__dirname + '/public/html/hello.html'));
});

var items = [
    { title: '볼펜', count: 4, price: 1800 },
    { title: '지우개', count: 1, price: 800 },
    { title: '연필', count: 12, price: 400 },
    { title:'필통', count:3, price:2800 }
];

app.get('/hello/data', function(req, res){
    res.json(items);
});

app.post('/hello/data', function(req, res){
    var body = req.body;
    console.log('req body : ' + JSON.stringify(body));
    items.push(body);
    res.json(true);
});

app.get('/todo', function(req, res){
    res.sendFile(path.join(__dirname + '/public/html/todo.html'));
});

app.get('/products', function(req, res){
    res.sendFile(path.join(__dirname + '/public/html/product.html'));
});

app.get('/books', function(req, res){
    res.sendFile(path.join(__dirname + '/public/html/book.html'));
});

app.listen(8080);
console.log('Express Listening on port 8080...');