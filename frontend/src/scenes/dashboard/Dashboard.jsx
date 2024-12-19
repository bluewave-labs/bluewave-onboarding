import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingArea from "../../components/LoadingPage/LoadingArea";
import { getStatistics } from "../../services/statisticsService";
import styles from "./Dashboard.module.scss";
import CreateActivityButtonList from "./HomePageComponents/CreateActivityButtonList/CreateActivityButtonList";
import DateDisplay from "./HomePageComponents/DateDisplay/DateDisplay";
import StatisticCardList from "./HomePageComponents/StatisticCardsList/StatisticCardsList";
import UserTitle from "./HomePageComponents/UserTitle/UserTitle";

const mapMetricName = (guideType) => {
  switch (guideType) {
    case "popup":
      return "Popups views";
    case "hint":
      return "Hints views";
    case "banner":
      return "Banners views";
    case "link":
      return "Links views";
    case "tour":
      return "Tours views";
    case "checklist":
      return "Checklists views";
    default:
      return "Unknown";
  }
};

const MAX_METRICS_DISPLAYED = 3;

const Dashboard = ({ name }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    getStatistics().then((data) => {
      setMetrics(
        data
          ?.map((metric) => ({
            metricName: mapMetricName(metric.guideType),
            metricValue: metric.views,
            changeRate: metric.change,
          }))
          ?.filter((_, i) => i < MAX_METRICS_DISPLAYED)
      );
      setIsLoading(false);
    });
  }, []);

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
      <div className={styles.text}>Start with a popular onboarding process</div>
      <CreateActivityButtonList buttons={buttons} />
      {isLoading ? <LoadingArea /> : <StatisticCardList metrics={metrics} />}
    </div>
  );
};

export default Dashboard;
