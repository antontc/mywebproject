var NumberQuestion = 0;
var NextQuestion = io.connect('http://40.69.209.77/nextquestion');
var NumberUserInSession = 0;
var Username = [];
var ScoreUsername = [0,0];
function buttonStatus() {
   NextQuestion.emit('NQ', NumberQuestion);

  
   NumberQuestion++;
    document.getElementById("u84-4").innerHTML=NumberQuestion;
}
NextQuestion.on('SendNQ', function(Question){
    document.getElementById("u85-4").innerHTML=Question;
});

var login = io.connect('http://40.69.209.77/login');
login.on('loginUser', function(User){
    if(NumberUserInSession == 0){
        document.getElementById("u78-4").innerHTML=User;
        NumberUserInSession++;
        Username[0] = User;

    }else{
        if(NumberUserInSession == 1){
            document.getElementById("u80-4").innerHTML=User;
            NumberUserInSession++;
            Username[1] = User;
        }else{
            alert("User3");

        }
    }

});

var AnswerQuestion = io.connect('http://40.69.209.77/answerquestion');
AnswerQuestion.on('Score', function(bool, name){
    if(bool == true){
        if(name == Username[0]){
            ScoreUsername[0]++;
            document.getElementById("u81-4").innerHTML=ScoreUsername[0];
        }else{
            if(name == Username[1]){
                ScoreUsername[1]++;
            document.getElementById("u82-4").innerHTML=ScoreUsername[1];   
            }else{alert("Error");}
        }
    }

});

function get_cookie ( cookie_name )
{
  var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
 
  if ( results )
    return ( unescape ( results[2] ) );
  else
    return null;
}

//var name = get_cookie("name");
//document.getElementById("u112-4").innerHTML="<p>" + name + "</p>";
// var date = new Date(new Date().getTime() + 60 * 60 * 1000);
 // document.cookie ="name=" + outgoingMessage + "; " + "expires=" + date.toUTCString();




 //document.getElementById("ASK").innerHTML=Question;