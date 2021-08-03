import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useState } from 'react';

import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';

const App = () => {
  const [userCredentials, setUserCredentials] = useState('');

  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route exact path="/"> <Redirect to="/login" /> </Route>
        <Route path="/login"> <Login userCredentials={userCredentials} setUserCredentials={setUserCredentials} /> </Route>
        <Route path="/signup"> <SignUp /> </Route>
        <Route path="/home"> <Home setUserCredentials={setUserCredentials} /> </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
