import React from "react";
import { Button, Stack } from "@mui/material";
import PurpleSecondary from "./Buttons/PurpleSecondary";
import PrimaryButton from "./Buttons/PrimaryButton";
import GreySecondary from "./Buttons/GreySecondary";
import ErrorButton from "./Buttons/ErrorButton";
import DisabledPrimary from "./Buttons/DisabledPrimary";
import DisabledSecondary from "./Buttons/DisabledSecondary";

const Buttons = () => {
    const primaryButtonClicked = ()=>{
        console.log('clicked');
    }
    return (
        <Stack spacing={2} direction="row">
            <PurpleSecondary />
            <GreySecondary/>
            <PrimaryButton onClick={primaryButtonClicked} />
            <ErrorButton/>
            <DisabledPrimary/>
            <DisabledSecondary/>
        </Stack>
    );
};



export default Buttons;