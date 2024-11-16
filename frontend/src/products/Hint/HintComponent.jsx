import React from "react";
import ReactMarkdown from "react-markdown";
import "./hintComponent.css";
import Button from "../../components/Button/Button";

const HintComponent = ({
  header,
  content,
  previewBtnText,
  headerBackgroundColor,
  headerColor,
  textColor,
  buttonBackgroundColor,
  buttonTextColor,
}) => {
  return (
    <>
      <div className="preview-container">
        {header && (
          <div
            className={"header"}
            style={{
              backgroundColor: headerBackgroundColor,
              color: headerColor,
            }}
          >
            <h3>{header}</h3>
          </div>
        )}
        <div className="preview-content-container" style={{ color: textColor }}>
          <div>
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
          <div className="preview-button-container">
            {previewBtnText && (
              <Button
                style={{
                  backgroundColor: buttonBackgroundColor,
                  color: buttonTextColor,
                  margin: "1rem",
                }}
                text={previewBtnText}
              ></Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HintComponent;
