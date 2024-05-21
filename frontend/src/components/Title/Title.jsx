import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import HeadingTabs from "../../components/Tabs/Tabs";
import './TitleStyles.css';

const Title = () => {
  return (
    <div className='titleContainer'>
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
      <Typography variant="h5" component="div">
        People
      </Typography>
      <Button className='add-new' variant="contained">
        Add New Employees
      </Button>
    </Box>
    <HeadingTabs/>
    </div>
  );
};

export default Title;