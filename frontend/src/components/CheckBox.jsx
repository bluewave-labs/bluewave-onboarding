import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export default function SizeCheckbox() {
    return (
        <>
            <div>
                <Checkbox />
                <Checkbox {...label} defaultChecked
                    sx={{
                        '&.Mui-checked': {
                            color: "#7f55d9",
                        },
                        "&:active": {
                            boxShadow: '0 0 0 0.2rem rgba(127,60,217,0.1)',
                            backgroundColor: 'white',
                            borderColor: 'rgba(127,60,217,0.2)',
                        },
                    }}
                />
                <Checkbox
                    {...label}
                    indeterminate sx={{

                        '&.Mui-checked': {
                            color: "#7f55d9",
                        },
                    }}
                />
            </div>
            <div>
                <Checkbox size='large' />
                <Checkbox size='large' {...label} defaultChecked
                    sx={{
                        '&.Mui-checked': {
                            color: "#7f55d9",
                        },
                    }}
                />
                <Checkbox size='large'
                    {...label}
                    indeterminate sx={{

                        '&.Mui-checked': {
                            color: "#7f55d9",
                        },
                    }}
                />
            </div>
        </>

    );
}