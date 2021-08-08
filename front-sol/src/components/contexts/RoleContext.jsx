import React, { createContext, useState, useEffect } from 'react';

//Context to check which role is activated in the moment
export const RoleContext = createContext({});

export const RoleProvider = ({ children }) => {
    const [role, setRole] = useState({ loading: true, data: null });
  
    const setRoleData = (data) => {
      setRole({data: data});
    };
   // a function that will help us to add the user data in the auth;
   useEffect(() => {
      setRole({ loading: false, data: JSON.parse(window.localStorage.getItem('roleData'))});
    }, []);
  //2. if object with key 'authData' exists in localStorage, we are putting its value in auth.data and we set loading to false.
  //This function will be executed every time component is mounted (every time the user refresh the page);
  
    useEffect(() => {
      window.localStorage.setItem('roleData', JSON.stringify(role.data));
    }, [role.data]);
  
    return (
      <RoleContext.Provider value={{ role, setRoleData }}>
        {children}
      </RoleContext.Provider>
    );
  };
  
  export default RoleProvider;