import React from 'react';
import { Navigate, Route, RouteProps } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface PrivateRouteProps extends Omit<RouteProps, 'element'> {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default PrivateRoute;