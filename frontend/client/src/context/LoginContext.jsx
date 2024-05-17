import React, { createContext, useState, useContext } from 'react';

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const login = (token) => {
    setIsLoggedIn(true);
    setToken(token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setToken(null);
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, token, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
