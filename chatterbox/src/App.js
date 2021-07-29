import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Login from './components/Login';
import SignUp from './components/SignUp';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Switch>
        <Route exact path="/"> <Redirect to="/login" /> </Route>
        <Route path="/login"> <Login /> </Route>
        <Route path="/signup"> <SignUp /> </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
