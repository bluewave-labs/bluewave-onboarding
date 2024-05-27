import React, { useState } from 'react';
import { Tab, Tabs } from '@mui/material';
import DataTable from "../Table/Table";
import { demoData } from '../../data/demoData';
import './TabStyles.css';

const HeadingTabs = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className='container-tabs'>
    <Tabs value={value} onChange={handleChange} className='tabs-row'>
      <Tab label="Directory" />
      <Tab label="My Team" />
    </Tabs>
    <DataTable data={demoData} />
    </div>
  );
};

export default HeadingTabs;
