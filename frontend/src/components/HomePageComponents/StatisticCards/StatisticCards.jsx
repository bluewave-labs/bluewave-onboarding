import React from 'react';
import PropTypes from 'prop-types';
import styles from './StatisticCards.module.scss';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const StatisticCard = ({ metricName, metricValue = 0, changeRate = 0 }) => {

  return (
    <div className={styles.statisticCard}>
      <div className={styles.metricName}>{metricName}</div>
      <div className={styles.metricValue}>{metricValue}</div>
      <div className={styles.changeRate}>

        <span style={{color: changeRate >= 0 ? 'green' : 'red'}} className={styles.change}>
          {changeRate >= 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
          {Math.abs(changeRate)}%
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
