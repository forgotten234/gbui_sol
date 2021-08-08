import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import WelcomePage from './components/main/WelcomePage';
import React from 'react'
import { Switch, Route } from "react-router-dom"
import PrivateRoute from './components/routes/PrivateRoute'
import Registration from './components/registration/Registration'
import Login from './components/login/Login'

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/sign-in" component={Login} />
        <Route exact path="/register" component={Registration} />
        <Route path="/" component={WelcomePage} />
      </Switch>
    </div>
  );
}

export default App;
