import Dashboard from "../dashboard/Dashboard";
import React from 'react';
import { useAuth } from "../../services/authProvider";

const Home = () => {
  const {userInfo} = useAuth();

  return (
    <Dashboard fullName={userInfo.fullName} />
  );
};

export default Home;
