import React from "react";
import { Button } from "@mui/material";
//BASE
const BORDER_COLOR = "rgba(127,60,217,0.2)";

//HOVER
const HOVER_BORDER_COLOR = "rgba(127,60,217,0.2)";
const HOVER__BACKGROUND_COLOR = "rgba(127,60,217,0.1)";
//ACTIVE
const ACTIVE_BOX_SHADOW = "0 0 0 0.2rem rgba(127,60,217,0.1)";
const ACTIVE_BACKGROUND_COLOR = "white";
const ACTIVE_BORDER_COLOR = "rgba(127,60,217,0.2)";
//STYLE
const STYLE_COLOR = "rgba(127,60,217,0.7)";
const STYLE_TEXT_TRANSFORM = "none";


const PurpleSecondary = ()=>{
    return ( 
        <Button  
            disableRipple
            variant="outlined"
            sx={{
                borderColor: BORDER_COLOR,
                "&:hover": {
                    borderColor: HOVER_BORDER_COLOR,
                    backgroundColor: HOVER__BACKGROUND_COLOR,
                },
                "&:active": {
                    boxShadow: ACTIVE_BOX_SHADOW,
                    backgroundColor: ACTIVE_BACKGROUND_COLOR,
                    borderColor: ACTIVE_BORDER_COLOR,
                },
            }}
            style={{ 
                color: STYLE_COLOR, 
                textTransform: STYLE_TEXT_TRANSFORM 
            }}
        >
        Secondary
    </Button>
    )
}

export default PurpleSecondary;