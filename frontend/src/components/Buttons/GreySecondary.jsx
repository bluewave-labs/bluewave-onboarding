import React from "react";
import { Button } from "@mui/material";

const BORDER_COLOR = "rgba(128,128,128,0.2)";
const COLOR = "rgba(128,128,128,0.9)";
const TEXT_TRANSFORM = "none"

//HOVER
const HOVER_BORDER_COLOR = "rgba(128,128,128,0.2)";
const HOVER_BACKGROUND_COLOR = "rgba(128,128,128,0.1)";

// ACTIVE 
const ACTIVE_BOX_SHADOW = "0 0 0 0.2rem rgba(128,128,128,0.1)";
const ACTIVE_BACKGROUND_COLOR = "white";
const ACTIVE_BORDER_COLOR = "rgba(128,128,128,0.1)";



const GreySecondary = () => {
    return (
        <Button
            disableRipple
            variant="outlined"
            sx={{
                borderColor: BORDER_COLOR,
                "&:hover": {
                    borderColor: HOVER_BORDER_COLOR,
                    backgroundColor: HOVER_BACKGROUND_COLOR
                },
                "&:active": {
                    boxShadow: ACTIVE_BOX_SHADOW,
                    backgroundColor: ACTIVE_BACKGROUND_COLOR,
                    borderColor: ACTIVE_BORDER_COLOR,
                },
            }}
            style={{
                color: COLOR,
                textTransform: TEXT_TRANSFORM
            }}>
            Secondary
        </Button>
    )
}

export default GreySecondary;