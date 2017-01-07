function get_cookie ( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
 
  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}
var name = get_cookie("name");
document.getElementById("u112-4").innerHTML="<p>" + name + "</p>";

var NextQuestion = io.connect('http://localhost/nextquestion');
NextQuestion.on('SendNq', function(Question){
    //var x = get_cookie ( "name" );
    //alert(x);
    document.getElementById("u117-4").innerHTML="<p>" + "</p>";
    document.getElementById("u118-4").innerHTML="<p>" + Question + "</p>";
});
var AnswerQuestion = io.connect('http://localhost/answerquestion'); 
function ClickTrue(){
  AnswerQuestion.emit('AnswerQuestion', name, true);
  AnswerQuestion.on('True or false', function(YesNo){
    document.getElementById("u117-4").innerHTML="<p>" + YesNo + "</p>";

  });

}

function ClickFalse(){
  AnswerQuestion.emit('AnswerQuestion', name, false);
  AnswerQuestion.on('True or false', function(YesNo){
    document.getElementById("u117-4").innerHTML="<p>" + YesNo + "</p>";

  });
}