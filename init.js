import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCsuBbxM51lSjRa9sVWL7Tg3snW6Nemlfw",
    authDomain: "greensmoothies-3be51.firebaseapp.com",
    databaseURL: "https://greensmoothies-3be51.firebaseio.com",
    projectId: "greensmoothies-3be51",
    storageBucket: "greensmoothies-3be51.appspot.com",
    messagingSenderId: "111244723356"
  };
  const firebaseApp = firebase.initializeApp(config);

firebaseApp.firestore().settings({ timestampsInSnapshots: true})

//export firestore database
export default firebaseApp.firestore()