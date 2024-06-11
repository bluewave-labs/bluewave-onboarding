import React from 'react';
import PropTypes from 'prop-types';

// Define the StatisticCard component
const StatisticCard = ({ metricName, metricValue, changeType }) => {
  return (
    <div className="statistic-card">
      <div className="metric-name">{metricName}</div>
      <div className="metric-value">{metricValue}</div>
      <div className={`change-type ${changeType}`}>
        {changeType === 'increase' ? '▲' : '▼'}
      </div>
    </div>
  );
};

// Define propTypes for the component
StatisticCard.propTypes = {
  metricName: PropTypes.string.isRequired,
  metricValue: PropTypes.number.isRequired,
  changeType: PropTypes.oneOf(['increase', 'decrease']),
};

export default StatisticCard;
