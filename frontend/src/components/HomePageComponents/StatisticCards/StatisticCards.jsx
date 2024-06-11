StatisticCard.propTypes = {
    metricName: PropTypes.string.isRequired,
    metricValue: PropTypes.number.isRequired,
    changeType: PropTypes.oneOf(['increase', 'decrease']), 
  };