import React from "react";
import DateDisplay from "./HomePageComponents/DateDisplay/DateDisplay";
import UserTitle from "./HomePageComponents/UserTitle/UserTitle";
import styles from "./Dashboard.module.scss";
import StatisticCardList from "./HomePageComponents/StatisticCardsList/StatisticCardsList";
import CreateActivityButtonList from "./HomePageComponents/CreateActivityButtonList/CreateActivityButtonList";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ name }) => {
  const navigate = useNavigate();
  const metrics = [
    { metricName: "Popup views", metricValue: 5000, changeRate: 5 },
    { metricName: "Hint views", metricValue: 2000, changeRate: -20 },
    { metricName: "Banner Views", metricValue: 3000, changeRate: 15 },
  ];

  const buttons = [
    {
      placeholder: "Create a popup",
      onClick: () => navigate("/popup/create"),
    },
    {
      placeholder: "Add a hint to your app",
      onClick: () => navigate("/hint/create"),
    },
    {
      placeholder: "Create a new banner",
      onClick: () => navigate("/banner/create"),
    },
  ];
  return (


      <div className={styles.container}>
        <div className={styles.top}>
          <UserTitle name={name} />
          <DateDisplay />
        </div>
        <div className={styles.text}>
          Start with a popular onboarding process
        </div>
        <CreateActivityButtonList buttons={buttons} />
        <StatisticCardList metrics={metrics} />
      </div>
  );
};

export default Dashboard;
