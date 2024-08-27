import React from 'react';
import LeftMenu from "../../components/LeftMenu/LeftMenu";
import Header from "../../components/Header/Header";
import "./HomePageTemplate.css";


const HomePageTemplate = ({ children}) => {

  return (
    <div className="container">
      <Header/>
      <div className="content-container">
        <LeftMenu className="sidebar"/>
        {children} 
        {/* some content */}
      </div>
    </div>
  );
};

export default HomePageTemplate;
