import React from "react";
import { Button } from "@mui/material";

// BASE
const COLOR = "white";
const BACKGROUND_COLOR = "#d82d21";
const TEXT_TRANSFORM = "none";
const BOX_SHADOW = "none";
const WIDTH = "80px"

//HOVER 
const HOVER_BACKGROUND_COLOR = "#b32217";
const HOVER_COLOR = "black"

// ACTIVE
const ACTIVE_BOX_SHADOW = "none";
const ACTIVE_BACKGROUND_COLOR = "#0062cc";
const ACTIVE_BORDER_COLOR = "#005cbf";





const ErrorButton = () => {
    return (
        <Button
            disableRipple
            variant="contained"
            style={{ 
                color: COLOR, 
                backgroundColor: BACKGROUND_COLOR, 
                textTransform: TEXT_TRANSFORM, 
                boxShadow: BOX_SHADOW 
            }}
            sx={{
                width: WIDTH,
                "&:hover": {
                    backgroundColor: HOVER_BACKGROUND_COLOR,
                    color: HOVER_COLOR
                },
                "&:active": {
                    boxShadow: ACTIVE_BOX_SHADOW,
                    backgroundColor: ACTIVE_BACKGROUND_COLOR,
                    borderColor: ACTIVE_BORDER_COLOR,
                },
            }}
        >
            Error
        </Button>
    )
}

export default ErrorButton;