import * as React from 'react';
import { styled } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function SizeCheckbox() {
    return (
        <div style={{textAlign: 'center'}}>
            <div>
                <Checkbox disableRipple
                style={{border:"0px"}}
                icon={<CheckBoxOutlineBlankIcon/>} 
                checkedIcon={<CheckBoxOutlineBlankIcon/>} 
                color='secondary'
                sx={{
                    '& .MuiSvgIcon-root': {
                      borderRadius: '40px', // Change this value to adjust the border radius
                    },
                  }}/>
                <Checkbox disableRipple 
                defaultChecked 
                color='secondary'
                />
                <Checkbox disableRipple 
                icon={<IndeterminateCheckBoxIcon/>} 
                checkedIcon={<IndeterminateCheckBoxIcon/>} 
                defaultChecked 
                color='secondary'/>
            </div>
            <div></div>
        </div>

    );
}