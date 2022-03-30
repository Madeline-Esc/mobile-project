import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyA3kFpg4TjqaKgdk5ydSoxfCQGh1T53ovM",
    authDomain: "prorest-f7848.firebaseapp.com",
    projectId: "prorest-f7848",
    storageBucket: "prorest-f7848.appspot.com",
    messagingSenderId: "734922364607",
    appId: "1:734922364607:web:df85ca8ddb21cf439a180a"
  }

  export const firebaseApp = firebase.initializeApp(firebaseConfig)