import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';

import firebase from 'firebase/app';
import 'firebase/auth';

const App = () => {
  const [userCredentials, setUserCredentials] = useState('');

  useEffect(() => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    firebase.auth().onAuthStateChanged((user) => {
      setUserCredentials(user);
    });
  }, []);

  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route exact path="/"> <Redirect to="/login" /> </Route>
        <Route path="/login"> <Login userCredentials={userCredentials} setUserCredentials={setUserCredentials} /> </Route>
        <Route path="/signup"> <SignUp /> </Route>
        <Route path="/home"> <Home userCredentials={userCredentials} setUserCredentials={setUserCredentials} /> </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
