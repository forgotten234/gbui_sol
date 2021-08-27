import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App';
import { BrowserRouter } from "react-router-dom"

//Provider to provide user and role data across the entire system
import {AuthProvider} from './components/contexts/AuthContext.jsx'
import {RoleProvider} from './components/contexts/RoleContext.jsx'
import {WebSocketProvider} from './components/contexts/WebSocketContext.jsx'

ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <RoleProvider>
                <WebSocketProvider>
                    <App />
                </WebSocketProvider>
            </RoleProvider>
        </AuthProvider>
    </BrowserRouter>,   
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
