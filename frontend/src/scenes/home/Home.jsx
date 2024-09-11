import HomePageTemplate from "../../templates/HomePageTemplate/HomePageTemplate";
import Dashboard from "../dashboard/Dashboard";
import "./Home.css";
import React from 'react';
import { useAuth } from "../../services/authProvider";

const Home = () => {
  const {userInfo} = useAuth();

  return (
    <div className="app">
      <div className="content">
        <HomePageTemplate>
          <Dashboard fullName={userInfo.fullName} />
        </HomePageTemplate>
      </div>
    </div>
  );
};

export default Home;