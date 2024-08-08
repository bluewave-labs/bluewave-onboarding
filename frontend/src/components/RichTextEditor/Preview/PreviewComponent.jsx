import React from "react";
import { Button, Divider } from "@mui/material";
import DOMPurify from "dompurify";
import "./PreviewComponent.css";

const PreviewComponent = ({ header, content, previewBtnText }) => {
  return (
    <>
      <div className="preview-container">
        {header && (
          <>
            <div className="preview-header">
              <h3>{header}</h3>
            </div>
            <Divider />
          </>
        )}
        <div className="preview-content">
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
          />
        </div>
        <div className="preview-button-container">
          {previewBtnText && (
            <Button className="preview-button" variant="contained">
              {previewBtnText}
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default PreviewComponent;
