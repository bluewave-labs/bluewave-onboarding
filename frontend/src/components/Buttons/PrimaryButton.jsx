import React from "react";
import { Button } from "@mui/material";

const COLOR = "white";
const BACKGROUND_COLOR = "#7f55d9";
const TEXT_TRANSFORM = "none";
const BOX_SHADOW = "none";
const WIDTH = "80px";

// HOVER 
const HOVER_BACKGROUND_COLOR = "black";



const PrimaryButton =({onClick, buttonText})=>{
    return (
        <Button
            disableRipple 
            onClick={onClick}
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
                    backgroundColor: HOVER_BACKGROUND_COLOR 
                } 
            }}
        >
            Primary
        </Button>
    )
}

export default PrimaryButton;