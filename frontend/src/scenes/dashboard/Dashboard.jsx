import React, { useState } from "react";
import DateDisplay from "../../components/HomePageComponents/DateDisplay/DateDisplay";
import UserTitle from "../../components/HomePageComponents/UserTitle/UserTitle";
import styles from "./Dashboard.module.scss";
import StatisticCardList from "../../components/HomePageComponents/StatisticCardsList/StatisticCardsList";
import CreateActivityButtonList from "../../components/HomePageComponents/CreateActivityButtonList/CreateActivityButtonList";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ username }) => {
  const navigate = useNavigate();
  const metrics = [
    { metricName: "Monthly active users", metricValue: 1000, changeRate: 10 },
    { metricName: "Tour views", metricValue: 5000, changeRate: 5 },
    { metricName: "Hint views", metricValue: 2000, changeRate: -20 },
    { metricName: "Popup Views", metricValue: 3000, changeRate: 15 },
  ];

  const buttons = [
    {
      placeholder: "Create a welcome tour",
      onClick: () => navigate("/welcome-tour-route"),
    },
    {
      placeholder: "Add a hint to your app",
      onClick: () => navigate("/hint-route"),
    },
    {
      placeholder: "Create a new banner",
      onClick: () => navigate("/new-banner-route"),
    },
  ];
  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <UserTitle userName={username} />
          <DateDisplay />
        </div>
        <div className={styles.text}>
          Start with a popular onboarding process
        </div>
        <CreateActivityButtonList buttons={buttons} />
        <StatisticCardList metrics={metrics} />
        <div style={{ display: "block", width: "fit-content" }}>
          
        </div>
      </div>
      
    </>
  );
};

export default Dashboard;
