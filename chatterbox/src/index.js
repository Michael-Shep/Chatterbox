import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/app';

firebase.initializeApp({
  apiKey: "AIzaSyCBdz_Y7izRiN-QobJXt1fZRnE3-VkTNZw",
  authDomain: "chatterbox-4da2f.firebaseapp.com",
  projectId: "chatterbox-4da2f",
  storageBucket: "chatterbox-4da2f.appspot.com",
  messagingSenderId: "181994268962",
  appId: "1:181994268962:web:1b03108caabd6e0030dd7b",
  measurementId: "G-J4SZKS381V"
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
