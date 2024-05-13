import React from "react";
import { Button } from "@mui/material";

const PrimaryButton =({onClick, buttonText})=>{
    return (
        <Button 
            onClick={onClick}
            variant="contained"
            style={{ 
                color: "white", 
                backgroundColor: "#7f55d9", 
                textTransform: 'none', 
                boxShadow: "none" 
            }}
            sx={{ 
                width: '80px', 
                "&:hover": { 
                    backgroundColor: "black" 
                } 
            }}
        >
            {buttonText}
        </Button>
    )
}

export default PrimaryButton;