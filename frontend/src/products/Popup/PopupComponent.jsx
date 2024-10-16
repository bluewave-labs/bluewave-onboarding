import React, { useState } from "react";
import DOMPurify from "dompurify";
import styles from "./PopupComponent.module.css"; // Use your module CSS file
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Button from "../../components/Button/Button";
import {ActionsTypes} from "../../../../Shared/constants.js";

const PopupComponent = ({
  header,
  content,
  previewBtnText,
  headerBackgroundColor,
  headerColor,
  textColor,
  buttonBackgroundColor,
  buttonTextColor,
  buttonAction,
  popupSize,
  actionButtonUrl,
  isReal
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const validSizes = ["small", "medium", "large"];
  const sizeClass = validSizes.includes(popupSize.toLowerCase()) ? styles[popupSize.toLowerCase()] : '';
  const centeredClass = isReal ? styles.centered : '';

  const handleClose = () => {
    if (isReal) {
      setIsVisible(false);
    }
  };

  const handleButtonClick = () => {
    if (buttonAction === ActionsTypes.CLOSE_POPUP) {
      handleClose();
    } else if (buttonAction === ActionsTypes.OPEN_URL) {
      window.open(actionButtonUrl, '_self'); 
    } else if (buttonAction === ActionsTypes.OPEN_URL_IN_NEW_TAB) {
      window.open(actionButtonUrl, '_blank'); 
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div className={`${styles.popupContainer} ${sizeClass} ${centeredClass}`}>
        {header && (
          <div
            className={styles.header}
            style={{ backgroundColor: headerBackgroundColor, color: headerColor }}
          >
            <h3 style={{ marginLeft: '5px' }}>{header}</h3>
            <CloseOutlinedIcon 
              style={{ color: '#98A2B3', fontSize: '20px', cursor: 'pointer' }} 
              onClick={handleClose} 
            />
          </div>
        )}
        <div className={styles.popupContentContainer}>
          <div
            className={styles.popupContent}
            style={{ color: textColor }}
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
          />
          <div className={styles.popupButtonContainer}>
            {previewBtnText && (
              <Button
                style={{
                  backgroundColor: buttonBackgroundColor,
                  color: buttonTextColor,
                  margin: '1rem'
                }}
                text={previewBtnText}
                onClick={handleButtonClick} // Add onClick handler
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PopupComponent;
