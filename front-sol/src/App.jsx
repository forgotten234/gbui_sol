import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import WelcomePage from './components/main/WelcomePage';
import React from 'react'
import { Switch, Route } from "react-router-dom"
import Registration from './components/registration/Registration'
import Login from './components/login/Login'
import Settings from './components/settings/mainComponents/Settings'
import InquiryMainPage from './components/inquiryManagement/InquiryMainPage'
import InquiryNotificationHandlerMain from './components/inquiryManagement/subComponents/notifications/InquiryNotificationHandlerMain';
import Navigationbar from './components/main/Navigationbar';
import BuiDetail from './components/BuiDetail/BuiDetail';
import MorphologicalBox from './components/morphologicalBox/MorphologicalBox';

function App() {
    return (
        <div>
            <Navigationbar style={{zIndex: "99"}}/>
            <InquiryNotificationHandlerMain style={{zIndex: "9"}}>
                <Switch>
                    <Route exact path="/sign-in" component={Login} />
                    <Route exact path="/register" component={Registration} />
                    <Route exact path="/settings" component={Settings} />
                    <Route exact path="/inquiry" component={InquiryMainPage} />
                    <Route exact path="/morphological-box" component={MorphologicalBox}/>
                    <Route path="/detail/:id" component={BuiDetail} />
                    <Route path="/" component={WelcomePage} />
                </Switch>
            </InquiryNotificationHandlerMain>
        </div>
    );

}

export default App;
