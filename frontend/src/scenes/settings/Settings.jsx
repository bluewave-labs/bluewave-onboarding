import React from "react";
import SettingsTabs from "./SettingsTabs/SettingsTabs";
import HomePageTemplate from "../../components/templates/HomePageTemplate";
import './Settings.css'

const Settings = () => {
  return (
    <div>
      <main>
      <HomePageTemplate>
        <div className="settings">
          <SettingsTabs />
        </div>
      </HomePageTemplate>
      </main>
    </div>
  );
};

export default Settings;
