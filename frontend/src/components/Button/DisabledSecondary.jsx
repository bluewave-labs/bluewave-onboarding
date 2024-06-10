import React from "react";
import { Button } from "@mui/material";


const COLOR = "grey";
const BACKGROUND_COLOR = "white";
const TEXT_TRANSFORM = "none";
const BORDER_COLOR = "rgba(128,128,128,0.2)";
const FONT_WEIGHT = "600";
const WIDTH = "120px"


const DisabledSecondary = () => {
    return (
        <Button
            disableRipple
            variant="outlined"
            style={{
                color: COLOR,
                backgroundColor: BACKGROUND_COLOR,
                textTransform: TEXT_TRANSFORM,
                borderColor: BORDER_COLOR,
                fontWeight: FONT_WEIGHT
            }}
            sx={{
                width: WIDTH,
                borderColor: BORDER_COLOR,
            }}
        >
            Error
        </Button>
    )
}

export default DisabledSecondary;