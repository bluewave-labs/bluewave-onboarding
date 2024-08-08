import React, { useEffect, useState } from 'react';
import LeftMenu from "../../components/LeftMenu/LeftMenu";
import Header from "../Header/Header";
import "./HomePageTemplate.css";
import { getCurrentUser } from '../../services/loginServices';

const HomePageTemplate = ({ children, user: initialUser }) => {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        const userData = await getCurrentUser();
        setUser(userData);
      };

      fetchUser();
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>; // Optionally show a loading indicator while fetching user data
  }

  return (
    <div className="container">
      <Header user={user} />
      <div className="content-container">
        <LeftMenu className="sidebar"/>
        {children} 
        {/* some content */}
      </div>
    </div>
  );
};

export default HomePageTemplate;
