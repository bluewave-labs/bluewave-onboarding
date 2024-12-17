import React from "react";
import DateDisplay from "../../components/HomePageComponents/DateDisplay/DateDisplay";
import UserTitle from "../../components/HomePageComponents/UserTitle/UserTitle";
import styles from "./Dashboard.module.scss";
import StatisticCardList from "../../components/HomePageComponents/StatisticCardsList/StatisticCardsList";
import CreateActivityButtonList from "../../components/HomePageComponents/CreateActivityButtonList/CreateActivityButtonList";
import { useNavigate } from "react-router-dom";
import PopUpSkeleton from "../../components/HomePageComponents/Skeletons/PopUpSkeleton";
import BannerSkeleton from "../../components/HomePageComponents/Skeletons/BannerSkeleton";
import HelperSkeleton from "../../components/HomePageComponents/Skeletons/HelperSkeleton";

const Dashboard = ({ fullName }) => {
  const navigate = useNavigate();
  const metrics = [
    { metricName: "Popup views", metricValue: 5000, changeRate: 5 },
    { metricName: "Hint views", metricValue: 2000, changeRate: -20 },
    { metricName: "Banner Views", metricValue: 3000, changeRate: 15 },
  ];

  const buttons = [
    {
      skeletonType: <PopUpSkeleton />,
      placeholder: "Create a popup",
      onClick: () => navigate("/popup/create"),
    },
    {
      skeletonType: <BannerSkeleton />,
      placeholder: "Create a new banner",
      onClick: () => navigate("/banner/create"),
    },
    {
      skeletonType: <HelperSkeleton />,
      placeholder: "Add a hint to your app",
      onClick: () => navigate("/hint/create"),
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <UserTitle fullName={fullName} />
        <DateDisplay />
      </div>
      <div className={styles.text}>Start with a popular onboarding process</div>
      <CreateActivityButtonList buttons={buttons} />
      <StatisticCardList metrics={metrics} />
    </div>
  );
};

export default Dashboard;
