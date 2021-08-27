import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import WelcomePage from './components/main/WelcomePage';
import React from 'react'
import { Switch, Route } from "react-router-dom"
import Registration from './components/registration/Registration'
import Login from './components/login/Login'
import Settings from './components/settings/mainComponents/Settings'
import InquiryMainPage from './components/inquiryManagement/InquiryMainPage'
function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/sign-in" component={Login} />
        <Route exact path="/register" component={Registration} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/inquiry" component={InquiryMainPage} />
        <Route path="/" component={WelcomePage} />
      </Switch>
    </div>
  );
}

export default App;
