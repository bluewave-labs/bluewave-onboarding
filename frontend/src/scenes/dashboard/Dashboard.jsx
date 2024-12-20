import React from "react";
import DateDisplay from "./HomePageComponents/DateDisplay/DateDisplay";
import UserTitle from "./HomePageComponents/UserTitle/UserTitle";
import styles from "./Dashboard.module.scss";
import StatisticCardList from "./HomePageComponents/StatisticCardsList/StatisticCardsList";
import CreateActivityButtonList from "./HomePageComponents/CreateActivityButtonList/CreateActivityButtonList";
import { useNavigate } from "react-router-dom";
import BannerSkeleton from "./HomePageComponents/Skeletons/BannerSkeleton";
import CustomSkeleton from "./HomePageComponents/Skeletons/CustomSkeleton";

const Dashboard = ({ name }) => {
  const navigate = useNavigate();
  const metrics = [
    { metricName: "Popup views", metricValue: 134, changeRate: 62 },
    { metricName: "Banner views", metricValue: 292, changeRate: 24 },
    { metricName: "Helper link views", metricValue: 2000, changeRate: -20 },
  ];

  const buttons = [
    {
      skeletonType: (
        <CustomSkeleton
          frontSkeletonProps={{
            position: "absolute",
            top: 20,
            left: 30,
            width: 80,
            height: 35,
          }}
        />
      ),
      placeholder: "Create a popup",
      onClick: () => navigate("/popup/create"),
    },
    {
      skeletonType: <BannerSkeleton />,
      placeholder: "Create a new banner",
      onClick: () => navigate("/banner/create"),
    },
    {
      skeletonType: (
        <CustomSkeleton
          frontSkeletonProps={{
            position: "absolute",
            bottom: "1rem",
            right: "0.8rem",
            width: 75,
            height: 60,
          }}
        />
      ),
      placeholder: "Create a new helper link",
      onClick: () => navigate("/hint/create"),
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <UserTitle name={name} />
        <DateDisplay />
      </div>
      <div className={styles.text}>Start with a popular onboarding process</div>
      <CreateActivityButtonList buttons={buttons} />
      <StatisticCardList metrics={metrics} />
    </div>
  );
};

export default Dashboard;
