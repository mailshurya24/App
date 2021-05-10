import firebase from 'firebase';
require("@firebase/firestore");

var firebaseConfig = {
    apiKey: "AIzaSyAwWICxPswljmJfl_zCqHVCSutcjB022ts",
    authDomain: "car-app-36274.firebaseapp.com",
    projectId: "car-app-36274",
    storageBucket: "car-app-36274.appspot.com",
    messagingSenderId: "494431861612",
    appId: "1:494431861612:web:135c1e0adcae249cb8d149",
    measurementId: "G-28C4TCTKSR"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

export default firebase.firestore();