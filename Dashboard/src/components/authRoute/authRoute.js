import React from 'react';
import { Navigate , Outlet} from 'react-router-dom';
import { useAuth } from '../../context/authContext';

const AuthRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/"  replace /> :  <Outlet />
};

export default AuthRoute;