import React from "react";
import { Button, Stack } from "@mui/material";
import DisabledButton from "./Buttons/DisabledButton";
import PrimaryButton from "./Buttons/PrimaryButton";

const Buttons = () => {
    const primaryButtonClicked = ()=>{
        console.log('clicked');
    }
    return (
        <Stack spacing={2} direction="row">
            <DisabledButton />
            <Button disableRipple
                variant="outlined"
                sx={{
                    borderColor: "rgba(128,128,128,0.2)",
                    "&:hover": { borderColor: "rgba(128,128,128,0.2)", backgroundColor: "rgba(128,128,128,0.1)" },
                    "&:active": {
                        boxShadow: '0 0 0 0.2rem rgba(128,128,128,0.1)',
                        backgroundColor: 'white',
                        borderColor: 'rgba(128,128,128,0.1)',
                    },
                }}
                style={{ color: "rgba(128,128,128,0.9)", textTransform: 'none' }}>
                Secondary
            </Button>
            <PrimaryButton onClick={primaryButtonClicked} buttonText={"benim button"} />
            <Button
                variant="contained"
                style={{ color: "white", backgroundColor: "#d82d21", textTransform: 'none', boxShadow: "none" }}
                sx={{
                    width: '80px',
                    "&:hover": {
                        backgroundColor: "#b32217",
                        color: "black"
                    },
                    "&:active": {
                        boxShadow: 'none',
                        backgroundColor: '#0062cc',
                        borderColor: '#005cbf',
                    },
                }}
            >
                Error
            </Button>

        </Stack>
    );
};



export default Buttons;