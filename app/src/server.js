var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cons = require('consolidate');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var logger = require('morgan');

var app = express();

var root = process.cwd();

// set Public Folder
app.use('/static',express.static(path.join(root)));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// your routes here

app.get('/', function (req, res) {
  res.sendFile('html/blogs.html', { root });
});

app.get('/blog', function (req, res) {
  res.sendFile('html/blog.html', { root });
});

app.get('/authentication', function (req, res) {
  res.sendFile('html/authentication.html', { root });
});

app.get('/js/blogs.js', function (req, res) {
  res.sendFile(path.join(root,'js/blogs.js'));
});

app.get('/js/authentication.js', function (req, res) {
  res.sendFile(path.join(root,'js/authentication.js'));
});

app.get('/js/main.js', function (req, res) {
  res.sendFile(path.join(root,'js/main.js'));
});

app.get('/category/science.jpg', function (req, res) {
  res.sendFile(path.join(root,'/category/science.jpg'));
});

app.get('/category/sports.jpg', function (req, res) {
  res.sendFile(path.join(root,'/category/sports.jpg'));
});

app.get('/category/technology.jpg', function (req, res) {
  res.sendFile(path.join(root,'/category/technology.jpg'));
});

app.get('/category/world.jpg', function (req, res) {
  res.sendFile(path.join(root,'/category/world.jpg'));
});

app.get('/category/programming.jpg', function (req, res) {
  res.sendFile(path.join(root,'/category/programming.jpg'));
});

app.get('/category/nature.jpg', function (req, res) {
  res.sendFile(path.join(root,'/category/nature.jpg'));
});

app.get('/category/entertainment.jpg', function (req, res) {
  res.sendFile(path.join(root,'/category/entertainment.jpg'));
});

app.get('/category/culture.jpg', function (req, res) {
  res.sendFile(path.join(root,'/category/culture.jpg'));
});

app.get('/category/business.jpg', function (req, res) {
  res.sendFile(path.join(root,'/category/business.jpg'));
});

app.get('/category/politics.jpg', function (req, res) {
  res.sendFile(path.join(root,'/category/politics.jpg'));
});

app.get('/img/image.jpg', function (req, res) {
  res.sendFile(path.join(root,'/img/image.jpg'));
});

app.get('/img/img_1.jpg', function (req, res) {
  res.sendFile(path.join(root,'/img/img_1.jpg'));
});

app.get('/img/img_2.png', function (req, res) {
  res.sendFile(path.join(root,'/img/img_2.png'));
});

app.get('/img/img_3.png', function (req, res) {
  res.sendFile(path.join(root,'/img/img_3.png'));
});

app.get('/img/img_4.jpg', function (req, res) {
  res.sendFile(path.join(root,'/img/img_4.jpg'));
});

app.get('/img/img_5.jpg', function (req, res) {
  res.sendFile(path.join(root,'/img/img_5.jpg'));
});

app.get('/img/img_6.jpg', function (req, res) {
  res.sendFile(path.join(root,'/img/img_6.jpg'));
});

app.get('/img/logo_1.jpg', function (req, res) {
  res.sendFile(path.join(root,'/img/logo_jpg'));
});

app.get('/img/logo_2.jpg', function (req, res) {
  res.sendFile(path.join(root,'/img/logo_2.jpg'));
});

app.get('/img/logo_3.png', function (req, res) {
  res.sendFile(path.join(root,'/img/logo_3.png'));
});

app.get('/register', function (req, res) {
  res.send('Register page');
});

/*app.post('/login', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  console.log();
});*/

app.listen(8080, function () {
  console.log('Example app listening on port 8080!');
});
