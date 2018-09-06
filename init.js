
import firebase from 'firebase'
import firestore from 'firebase/firestore'

// Initialize Firebase
  var config = {
    apiKey: "My API KEY",
    authDomain: "myApp.firebaseapp.com",
    databaseURL: "https://myApp.firebaseio.com",
    projectId: "myAppName",
    storageBucket: "myApp.appspot.com",
    messagingSenderId: "messagingSenderID"
  };
  const firebaseApp = firebase.initializeApp(config);

firebaseApp.firestore().settings({ timestampsInSnapshots: true})

//export firestore database
export default firebaseApp.firestore()
