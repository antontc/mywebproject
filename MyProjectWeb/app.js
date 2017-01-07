
var express = require('express');
var app = express();
var http = require('http');
var path = require('path');

app.set('port', 3000);

var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
app.use(express.static(__dirname + '/'));
app.use(function(req, res, next){
  if(req.url == '/' ){
    res.sendfile('index.html');
   
  }else{
    next();
  }
});
app.use(function(req, res, next){
  if (req.url == '/user'){
    res.sendfile('user.html');
    
  }else{
    next();
  }
});
app.use(function(req, res, next){
  if (req.url == '/admin'){
    res.sendfile('admin.html');
  }else{
    next();
  }
});
var User = ["User1", "User2"];
var NumberUser = 0;
var ID = ["ID1", "ID2"]

var io = require('socket.io').listen(server);


var login = io
  .of('/login')
  .on('connection', function (socket) {
    socket.on('message', function (text) {
   socket.broadcast.emit('loginUser', text);
      if(NumberUser > 1){
          console.log("3 игрок");
      }
    
      User[NumberUser] = text;
      ID[NumberUser] = (socket.id).toString().substr(0, 5);

      console.log(User[NumberUser]);
      console.log(ID[NumberUser]);
      NumberUser++;
      
  });

  
});

var NextQuestion = io.of('/nextquestion').on('connection', function(socket){
  socket.on('NQ', function(NumberQuestion){
  Number = NumberQuestion;
  socket.emit('SendNQ', Question[NumberQuestion]);
  socket.broadcast.emit('SendNq', Question[NumberQuestion]);
  AnswerQuestion = 0;


  });

});

var AnswerQuestion = io.of('/answerquestion').on('connection', function(socket){
  socket.on('AnswerQuestion', function(name, bool){
    if(AnswerQuestion == 0){
      AnswerQuestion++;
      if (bool == Answer[Number]){
        socket.emit('True or false', "Правильно!");
        socket.broadcast.emit('Score', true, name);


      }else{
        socket.emit('True or false', "Ответ неверный");
        socket.broadcast.emit('Score', false, name);
      }
    }else{
  socket.emit('True or false', "Уже есть ответ.");
    }

  });
});

var Question = ["answer true", "answer false dfghjjnbvcxsertyujbvdfgbvfdt answer false sdfghjkhgfdertyh", "answer true","answer false","answer true","answer false","answer true"];
var Answer = [true, false, true, false, true, false, true, false, true];
var Number;
var AnswerQuestion;

function get_cookie ( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
 
  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}