import React, { useState } from 'react';
import DateDisplay from '../../components/HomePageComponents/DateDisplay/DateDisplay';
import UserTitle from '../../components/HomePageComponents/UserTitle/UserTitle';
import styles from "./Dashboard.module.scss";
import StatisticCardList from '../../components/HomePageComponents/StatisticCardsList/StatisticCardsList';
import CreateActivityButtonList from '../../components/HomePageComponents/CreateActivityButtonList/CreateActivityButtonList';
import CustomCheckbox from '../../components/Checkbox/Checkbox';

const Dashboard = ({ username }) => {
  const metrics = [
    { metricName: "Monthly active users", metricValue: 1000, changeRate: 10 },
    { metricName: "Tour views", metricValue: 5000, changeRate: 5 },
    { metricName: "Hint views", metricValue: 2000, changeRate: -20 },
    { metricName: "Popup Views", metricValue: 3000, changeRate: 15 }
  ];

  const buttons = [
    { placeholder: "Create a welcome tour" },
    { placeholder: "Add a hint to your app" },
    { placeholder: "Create a new banner" }
  ];

  const [checkedPrimary, setCheckedPrimary] = useState(false);
  const [checkedSecondary, setCheckedSecondary] = useState(false);
  const [checkedLarge, setCheckedLarge] = useState(false);
  const [checkedIndeterminate, setCheckedIndeterminate] = useState([false, false]);

  const handlePrimaryCheckboxChange = (event) => {
    setCheckedPrimary(event.target.checked);
  };

  const handleSecondaryCheckboxChange = (event) => {
    setCheckedSecondary(event.target.checked);
  };

  const handleLargeCheckboxChange = (event) => {
    setCheckedLarge(event.target.checked);
  };

  const handleIndeterminateChange = (event) => {
    const newChecked = event.target.checked;
    setCheckedIndeterminate([newChecked, newChecked]);
  };

  const handleIndeterminateChildChange = (index) => (event) => {
    const newChecked = [...checkedIndeterminate];
    newChecked[index] = event.target.checked;
    setCheckedIndeterminate(newChecked);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.top}>
          <UserTitle userName={username} />
          <DateDisplay />
        </div>
        <div className={styles.text}>
          Start with a popular onboarding process
        </div>
        <CreateActivityButtonList buttons={buttons} />
        <StatisticCardList metrics={metrics} />
        <CustomCheckbox 
          label="Primary Checkbox"
          checked={checkedPrimary}
          onChange={handlePrimaryCheckboxChange}
          variant="primary"
          size="medium"
        />
        <CustomCheckbox 
          label="Secondary Checkbox"
          checked={checkedSecondary}
          onChange={handleSecondaryCheckboxChange}
          variant="secondary"
          size="medium"
        />
        <CustomCheckbox 
          label="Large Checkbox"
          checked={checkedLarge}
          onChange={handleLargeCheckboxChange}
          variant="primary"
          size="large"
        />
        <CustomCheckbox 
          label="Indeterminate Parent Checkbox"
          checked={checkedIndeterminate.every(Boolean)}
          onChange={handleIndeterminateChange}
          variant="primary"
          indeterminate={checkedIndeterminate.some((child) => child !== checkedIndeterminate[0])}
          childrenCheckboxes={["Child 1", "Child 2"]}
          childChecked={checkedIndeterminate}
          handleChildChange={handleIndeterminateChildChange}
        />
      </div>
    </>
  );
};

export default Dashboard;
