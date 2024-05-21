import React from 'react';
import { Box, Tooltip, Typography, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const Tooltips = () => {
  return (
    <Box sx={{ padding: '20px' }}>
      <Tooltip title="This is a tooltip" arrow>
        <Typography variant="body1">Hover over me</Typography>
      </Tooltip>
      <br />
      <Tooltip title="This is a tooltip" arrow>
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Tooltip>
      <br />
      <Tooltip 
        title={
          <div>
            <Typography color="inherit">This is a tooltip</Typography>
            Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text.
          </div>
        }
        arrow
      >
        <Typography variant="body1">Hover over me</Typography>
      </Tooltip>
      <br />
      <Tooltip 
        title={
          <div>
            <Typography color="inherit">This is a tooltip</Typography>
            Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text.
          </div>
        }
        arrow
      >
        <Box sx={{ p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
          <Typography variant="body1">Hover over me</Typography>
        </Box>
      </Tooltip>
    </Box>
  );
};

export default Tooltips;
