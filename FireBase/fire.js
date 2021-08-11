import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyA-g6xHqOhZHQfEiF77UKxTC2FnFMblgnQ",
    authDomain: "earme-e6565.firebaseapp.com",
    projectId: "earme-e6565",
    storageBucket: "earme-e6565.appspot.com",
    messagingSenderId: "276771037916",
    appId: "1:276771037916:web:6db25e586e2fa139daca19",
    measurementId: "G-0B8RQ2G4RS"
  };


if (!firebase.apps.length) {
    const Firebase = firebase.initializeApp(firebaseConfig)
}

const db = firebase.firestore()
export { db }
export default firebase