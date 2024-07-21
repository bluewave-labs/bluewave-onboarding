import React from "react";
import DOMPurify from "dompurify";
import "./PreviewComponent.css";

const PreviewComponent = ({ header, content }) => {
  return (
    <div>
      <p style={{ textAlign: "center" }}>Preview</p>
      <div className="preview-container">
        <div className="preview-header">
          <h3>{header}</h3>
        </div>
        <div className="preview-content">
          <div
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
          />
        </div>
      </div>
    </div>
  );
};

export default PreviewComponent;
