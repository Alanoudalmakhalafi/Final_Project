import firebase from 'firebase/app'
import 'firebase/storage'


  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyBwJPBXUXIrU3gUOMSkY2tfUZZukZfJLxM",
    authDomain: "test-399c4.firebaseapp.com",
    projectId: "test-399c4",
    storageBucket: "test-399c4.appspot.com",
    messagingSenderId: "320709446768",
    appId: "1:320709446768:web:58053219c0a8b1d49cf8b5",
    measurementId: "G-KWKXNV1K3E"
  };
   firebase.initializeApp(Config);
   const storge = firebase.storge()
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
export{
    storge, firebase as default 
}