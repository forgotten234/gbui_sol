import React, { createContext, useState, useEffect } from 'react';

//Context to check which role is activated in the moment
export const WebSocketContext = createContext({});

export const WebSocketProvider = ({ children }) => {
    const [message, setMessage] = useState({ loading: true, data: null });
  
    const setMessageData = (data) => {
      setMessage({data: data});
    };
   // a function that will help us to add the user data in the auth;
   useEffect(() => {
      setMessage({ loading: false, data: JSON.parse(window.localStorage.getItem('messageData'))});
    }, []);
  //2. if object with key 'authData' exists in localStorage, we are putting its value in auth.data and we set loading to false.
  //This function will be executed every time component is mounted (every time the user refresh the page);
  
    useEffect(() => {
      window.localStorage.setItem('messageData', JSON.stringify(message.data));
    }, [message.data]);
  
    return (
      <WebSocketContext.Provider value={{ message, setMessageData }}>
        {children}
      </WebSocketContext.Provider>
    );
  };
  
  export default WebSocketProvider;