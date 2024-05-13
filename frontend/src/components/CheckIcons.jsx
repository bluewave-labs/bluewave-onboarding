import React from 'react';
import CheckCircleTwoToneIcon from '@mui/icons-material/CheckCircleTwoTone';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Stack } from '@mui/material';


const CheckIcons = () => {
  return (
    <Stack spacing={2} direction={"row"} >
        <CheckCircleTwoToneIcon fontSize="small"/>
        <CheckCircleTwoToneIcon/>
        <CheckCircleTwoToneIcon fontSize="large" disabled/>
    </Stack>
  )
}

export default CheckIcons;