import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';

export default function VariantButtonGroup() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& > *': {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="outlined" aria-label="Basic button group" sx={{
        borderColor: 'white', // Change border color
        
        '& .MuiButton-outlined': {
          backgroundColor: 'white', // Change button background color
          borderColor: 'lightgrey', // Change button border color
        },
        '& .MuiButton-root': {
          color: 'grey', // Change text color
        },
      }}
    >
        <Button>Text</Button>
        <Button>Text</Button>
        <Button>Text</Button>
      </ButtonGroup>
      <ButtonGroup size='small' variant="outlined" aria-label="Basic button group" sx={{
        borderColor: 'white', // Change border color
        
        '& .MuiButton-outlined': {
          backgroundColor: 'white', // Change button background color
          borderColor: 'lightgrey', // Change button border color
        },
        '& .MuiButton-root': {
          color: 'grey', // Change text color
        },
      }} >
        <Button><ArrowBackIcon/></Button>
        <Button><AddIcon/></Button>
        <Button><ArrowForwardIcon/></Button>
      </ButtonGroup>
    </Box>
  );
}