import React from 'react';
import LeftMenu from "../../components/LeftMenu/LeftMenu";
import Header from "../../components/Header/Header";
import "./HomePageTemplate.css";
import { Outlet } from "react-router-dom";


const HomePageTemplate = () => {

  return (
    <div className="container">
      <Header/>
      <div className="content-container">
        <LeftMenu className="sidebar"/>
        <Outlet />
      </div>
    </div>
  );
};

export default HomePageTemplate;
