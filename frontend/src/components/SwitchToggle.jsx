import * as React from 'react';
import { alpha, styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const Toggle = styled(Switch)(() => ({
    width: 50,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(24px)',
        color: 'white',
        '& + .MuiSwitch-track': {
          backgroundColor: '#7f55d9',
          opacity: 0.8,
          border: 0,
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
      color:"white",
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: "#f3f4f7",
      opacity: 1,
    },
    
    
  }));
  
  const label = { inputProps: { 'aria-label': 'Color switch demo' } };
  
  export default function SwitchToggle() {
    return (
      <div>
        <Toggle {...label} defaultChecked />
      </div>
    );
  }