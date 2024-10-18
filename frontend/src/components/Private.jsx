import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/authProvider';
import LoadingPage from './LoadingPage/LoadingPage'

const Private = ({ Component }) => {
  const { isLoggedIn, isFetching } = useAuth();

  return isFetching ? <LoadingPage /> : (isLoggedIn ? <Component /> : <Navigate to="/login" />);
}

export default Private;