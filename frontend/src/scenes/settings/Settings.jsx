import React from "react";
import SettingsTabs from "./SettingsTabs/SettingsTabs";
import './Settings.css'
import HomePageTemplate from "../../components/templates/HomePageTemplate";

const Settings = () => {
  return (
    <div>
      <HomePageTemplate>
        <div className="settings">
          <SettingsTabs />
        </div>
      </HomePageTemplate>
    </div>
  );
};

export default Settings;
