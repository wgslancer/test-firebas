const db = firebase.firestore();

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

const logoutBtn = document.getElementById('logout');

const logout = () => {
  console.log('logout');
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('da dang xuat');
    })
    .catch((err) => console.log(err));
};

logoutBtn.addEventListener('click', logout);

const sendBtn = document.getElementById('send');

const sendMessage = () => {
  event.preventDefault();
  const messageInput = document.getElementById('message');

  db.collection('messages')
    .add({
      value: messageInput.value,
      createdAt: new Date(),
    })
    .then((docRef) => {
      console.log('Document written with ID: ', docRef.id);
    })
    .catch((error) => {
      console.error('Error adding document: ', error);
    });
};

sendBtn.addEventListener('click', sendMessage);
sendBtn.addEventListener('submit', sendMessage);

const appendMessage = (value, createdAt) => {
  const messageP = document.createElement('p');
  messageP.innerText = `${value}: ${new Date(createdAt).toLocaleString()}`;
  return messageP;
};

const displayMessages = () => {
  db.collection('messages').onSnapshot((doc) => {
    console.log('Current data: ', doc.docs);
    doc.docs.forEach((message) => {
      db.collection('messages')
        .doc(message.id)
        .onSnapshot((message) => {
          console.log(message.data());
          const { value, createdAt } = message.data();
          const messagesContainer = document.querySelector('div.messages');
          messagesContainer.appendChild(
            appendMessage(value, createdAt.toDate())
          );
        });
    });
  });
};

displayMessages();
