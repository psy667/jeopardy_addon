var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.sendfile('dist/index.html');
});

app.get('/admin', function(req, res) {
  res.sendfile('dist/admin.html');
});

app.use(express.static('dist'));

let started = false;
let context = this;

let answers = {};
let messages = [];
let order = 1;

app.get('/end', function(req, res) {
  console.log('Round started');
  started = false;

  answers = {};
  order = 1;

  res.send({
    resp: 'ok'
  });
});

app.get('/start', function(req, res) {
  console.log('Round ended');
  started = true;

  res.send({
    ping: 'ok'
  });
});
app.get('/getAnswers', function(req, res) {

  res.send({
    answers: answers
  });

});
app.get('/getMessages', function(req, res) {

  res.send({
    messages: messages
  });
});

app.get('/sendMessage', function(req, res) {

  let user = req.query.user;
  let text = req.query.text;

  console.log('New message from', user);

  messages.push({
    name: user,
    text: text
  });

  res.send({
    resp: 'ok'
  });
});


app.get('/answer', function(req, res) {

  let user = req.query.user;
  let uid = req.query.id;
  let skip = req.query.skip;
  console.log('New answer from', user);

  if (started && !answers[uid]) {

    answers[uid] = {
      name: user,
      order: order,
      skip: skip
    };
    order++;
  }

  res.send({
    falseStart: !started
  });
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});
