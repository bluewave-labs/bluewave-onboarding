import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const Title = () => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
      <Typography variant="h5" component="div">
        People
      </Typography>
      <Button variant="contained" color="primary">
        Add New Employees
      </Button>
    </Box>
  );
};

export default Title;