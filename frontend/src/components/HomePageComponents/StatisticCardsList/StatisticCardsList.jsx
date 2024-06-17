import React from 'react';
import StatisticCards from '../StatisticCards/StatisticCards';
import styles from "./StatisticCardsList.module.scss"

const StatisticCardList = ({ metrics }) => {
    return (
        <div className={styles.statisticCards}>
            {metrics.map((metric, index) => (
                <StatisticCards
                    key={index}
                    metricName={metric.metricName}
                    metricValue={metric.metricValue}
                    changeRate={metric.changeRate}
                />
            ))}
        </div>
    );
};

export default StatisticCardList;
