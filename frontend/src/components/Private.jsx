import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/authProvider';

const Private = ({Component}) => {
  const { isLoggedIn } = useAuth();

    return isLoggedIn ? <Component /> : <Navigate to="/" />
}

export default Private