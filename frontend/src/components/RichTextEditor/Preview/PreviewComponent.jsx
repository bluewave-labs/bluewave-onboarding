import React from "react";
// import { Button } from "@mui/material";
import DOMPurify from "dompurify";
import "./PreviewComponent.css";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Button from "../../Button/Button";

const PreviewComponent = ({ header,
  content,
  previewBtnText,
  headerBackgroundColor,
  headerColor,
  textColor,
  buttonBackgroundColor,
  buttonTextColor }) => {

  return (
    <>
      <div className="preview-container">
        {header && (
          <div className={"header"} style={{ backgroundColor: headerBackgroundColor, color: headerColor }}>
            <h3 style={{ marginLeft: '5px' }}>{header}</h3>
            <CloseOutlinedIcon style={{ color: '#98A2B3', fontSize: '20px' }} />
          </div>
        )}
        <div className="preview-content"
          style={{ color: textColor }}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        />
        <div className="preview-button-container">
          {previewBtnText && (
            <Button 
              style={{
                backgroundColor: buttonBackgroundColor,
                color: buttonTextColor,
                margin: '1rem'
              }}
              text={previewBtnText}>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default PreviewComponent;
