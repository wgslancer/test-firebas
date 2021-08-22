function register() {
  event.preventDefault();
  console.log('call');
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  firebase
    .auth()
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorCode);
      console.log(errorMessage);
    });
}

const registerBtn = document.getElementById('register');

registerBtn.addEventListener('submit', register);
registerBtn.addEventListener('click', register);

function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      // /** @type {firebase.auth.OAuthCredential} */
      const credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      // The signed-in user info.
      var user = result.user;
      console.log(credential, user);
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...

      console.log(errorCode, errorMessage, email, credential);
    });
}

const googleBtn = document.getElementById('google-login');

googleBtn.addEventListener('click', loginWithGoogle);
