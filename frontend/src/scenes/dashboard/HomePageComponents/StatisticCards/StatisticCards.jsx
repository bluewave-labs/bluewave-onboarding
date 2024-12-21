import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PropTypes from "prop-types";
import React from "react";
import styles from "./StatisticCards.module.scss";

const StatisticCard = ({ metricName, metricValue = 0, changeRate = 0 }) => {
  const getChangeRate = () => {
    if (changeRate === 0) return "N/A";
    return Math.abs(changeRate) + "%";
  };

  const getRateColor = () => {
    if (changeRate === 0) return "inherit";
    return changeRate >= 0 ? "green" : "red";
  };

  return (
    <div className={styles.statisticCard}>
      <div className={styles.metricName}>{metricName}</div>
      <div className={styles.metricValue}>{metricValue}</div>
      <div className={styles.changeRate}>
        <span style={{ color: getRateColor() }} className={styles.change}>
          {changeRate !== 0 &&
            (changeRate >= 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
          {getChangeRate()}
        </span>
        &nbsp;vs last month
      </div>
    </div>
  );
};

StatisticCard.propTypes = {
  metricName: PropTypes.string.isRequired,
  metricValue: PropTypes.number.isRequired,
  changeRate: PropTypes.number.isRequired,
};

export default StatisticCard;
