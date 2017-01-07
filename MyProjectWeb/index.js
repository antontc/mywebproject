   
var login = io.connect('http://13.79.158.25/login');

document.forms.publish.onsubmit = function() {
  //document.cookie = "username=Вася";
  var outgoingMessage = this.message.value;
  login.emit('message', outgoingMessage);
  var date = new Date(new Date().getTime() + 60 * 60 * 1000);
  document.cookie ="name=" + outgoingMessage + "; " + "expires=" + date.toUTCString();
  window.location.href='user';  
  return false;
};

