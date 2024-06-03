import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import HeadingTabs from "../../components/Tabs/Tabs";
import './TitleStyles.css';

const Title = ({ title, buttonText, onButtonClick, children }) => {
  return (
    <div className='titleContainer'>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Button className='add-new' variant="contained" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </Box>
      {children}
    <HeadingTabs/>
    </div>
  );
};

export default Title;