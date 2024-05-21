import * as React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:hover': {
    '&.Mui-checked': {
      '& + .MuiSwitch-track': {
        backgroundColor: 'pink',
      },
    },
  },
  // '&:focus': {
  //   '& .MuiSwitch-track': {
  //     boxShadow: `0 0 0 3px rgba(#fff)`, // Switch toggle'a focus olduğunda etrafında bir gölge oluşturur
  //   },
  // },
  
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
      
      
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
      
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: "#7f55d9",
      },
      
      
    },
    
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
  
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    boxSizing: 'border-box',
    backgroundColor:"#f3f4f7"
  },
}));
  const label = { inputProps: { 'aria-label': 'Color switch demo' } };
  
  export default function SwitchToggle() {
    return (
      <div>
        <AntSwitch {...label} defaultChecked />
      </div>
    );
  }