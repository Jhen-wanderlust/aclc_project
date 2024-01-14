var uid = "";
var rest = "";


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    uid = user.uid;
    var providerData = user.providerData;
    
    user.getIdToken().then(function(data) {
    rest = data;
    
    });
    
  } else {
    window.location = "https://reservation-system-69ff9.web.app/jheny-salon/login-box-concept/index.html";
  }
  
});