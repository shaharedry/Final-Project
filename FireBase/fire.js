// import firebase from 'firebase'
// import 'firebase/firestore'
import firebase from 'firebase/compat/app' 
import 'firebase/compat/auth' 
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA-g6xHqOhZHQfEiF77UKxTC2FnFMblgnQ",
    authDomain: "earme-e6565.firebaseapp.com",
    projectId: "earme-e6565",
    storageBucket: "earme-e6565.appspot.com",
    messagingSenderId: "276771037916",
    appId: "1:276771037916:web:6db25e586e2fa139daca19",
    measurementId: "G-0B8RQ2G4RS"
  };


  let app;

  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
  } else {
    app = firebase.app();
  }
  
  const db = app.firestore();
  const auth = firebase.auth();
  
  export { db, auth };

// if (!firebase.apps.length) {
//     const Firebase = firebase.initializeApp(firebaseConfig)
// }

//const db = firebase.firestore()
//export { db }
export default firebase