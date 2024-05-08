import React, { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import './TabStyles.css';

const MyTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange}>
      <Tab label="My Details" />
      <Tab label="My Team" />
      <Tab label="Departments" />
      <Tab label="Approvals" />
    </Tabs>
  );
};

export default MyTabs;
