import HomePageTemplate from "../../templates/HomePageTemplate/HomePageTemplate";
import Dashboard from "../dashboard/Dashboard";
import "./Home.css";
import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../services/loginServices';
import Cookies from 'js-cookie';

const Home = () => {
  const initialUsername = Cookies.get('username') || 'username';
  const [username, setUsername] = useState(initialUsername);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setUsername(user.username);
    };
    fetchUser();
  }, [username]);

  return (
    <div className="app">
      <div className="content">
        <HomePageTemplate>
          <Dashboard username={username} />
        </HomePageTemplate>
      </div>
    </div>
  );
};

export default Home;