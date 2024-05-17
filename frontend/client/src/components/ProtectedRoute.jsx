import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { useLogin } from '../context/LoginContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isLoggedIn } = useLogin();
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : navigate("/login") 
      }
    />
  );
};

export default ProtectedRoute;
