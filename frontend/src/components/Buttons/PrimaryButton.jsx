import React from "react";
import { Button } from "@mui/material";

const COLOR = "white";
const BACKGROUND_COLOR = "#7f55d9";
const TEXT_TRANSFORM = "none";
const BOX_SHADOW = "none";
const WIDTH = "80px";

// HOVER 
const HOVER_BACKGROUND_COLOR = "black";

// style={{ 
//     color: COLOR, 
//     backgroundColor: BACKGROUND_COLOR, 
//     textTransform: TEXT_TRANSFORM, 
//     boxShadow: BOX_SHADOW 
// }}


const PrimaryButton = () => {
    return (
        <Button
            disableRipple
            variant="contained"
            sx={{
                color: "white",
                backgroundColor: "#7f55d9",
                textTransform: "none",
                boxShadow: "none",
                width: "80px",
                "&:hover": {
                    backgroundColor: "black",
                }
            }}
        >
            Primary
        </Button>
    )
}

export default PrimaryButton;