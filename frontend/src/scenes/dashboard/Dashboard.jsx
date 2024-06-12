import React from 'react';
import { Box } from "@mui/material";
import DataTable from "../../components/DataTable/DataTable";
import { demoData } from "../../data/demoData";
import CreateActivityButton from '../../components/HomePageComponents/CreateActivityButton/CreateActivityButton';
import StatisticCard from '../../components/HomePageComponents/StatisticCards/StatisticCards';
import DateDisplay from '../../components/HomePageComponents/DateDisplay/DateDisplay';
import UserTitle from '../../components/HomePageComponents/UserTitle/UserTitle';
import styles from "./Dashboard.module.scss"

const Dashboard = ({username}) => {
    return (
        <>
            {/* <DataTable data={demoData} /> */}
            <div className={styles.container}>
                <div className={styles.top}>
                    <UserTitle userName={username}/>
                    <DateDisplay/>
                </div>
                <div className={styles.text}>
                Start with a popular onboarding process
                </div>
                <div className={styles.activityButtons}>
                    <CreateActivityButton 
                        placeholder="Create a welcome tour" 
                    />
                    <CreateActivityButton 
                        placeholder="Add a hint to your app" 
                    />
                    <CreateActivityButton 
                        placeholder="Create a new banner" 
                    />
                </div>
                <div className={styles.statisticCards}>
                    <StatisticCard 
                        metricName="Monthly active users" 
                        metricValue={1000} 
                        changeRate="10"
                    />
                    <StatisticCard 
                        metricName="Tour views" 
                        metricValue={5000} 
                        changeRate="5" 
                    />
                    <StatisticCard 
                        metricName="Hint views" 
                        metricValue={2000} 
                        changeRate="-20"
                    />
                    <StatisticCard 
                        metricName="Popup Views" 
                        metricValue={3000} 
                        changeRate="15"
                    />
                </div>
            </div>

        </>
    );
};

export default Dashboard;
