import { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import './SettingsTabs.css'
import ProfileTab from './ProfileTab/ProfileTab';


const tabLabel = ['Profile', 'Password', 'Team']

export default function SettingsTabs() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Profile" value="1" className='tab-label'/>
            <Tab label="Password" value="2" className='tab-label'/>
            <Tab label="Team" value="3" className='tab-label'/>
          </TabList>
        </Box>
        <TabPanel value="1"><ProfileTab/></TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </Box>
  );
}
