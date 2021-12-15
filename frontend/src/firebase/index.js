import firebase from 'firebase/app'
import 'firebase/storage'


  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-analytics.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyCvhhrWqnYT8tGA8bgUThiJbDLyxcrVpNw",
    authDomain: "react-drawer-dd1b7.firebaseapp.com",
    projectId: "react-drawer-dd1b7",
    storageBucket: "react-drawer-dd1b7.appspot.com",
    messagingSenderId: "208663794997",
    appId: "1:208663794997:web:4ab26a7631fd86aeb7687c",
    measurementId: "G-YP9GQVR1E2"
  };

  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
