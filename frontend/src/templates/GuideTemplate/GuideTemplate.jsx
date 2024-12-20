import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Dialog } from "@mui/material";
import classNames from "classnames";
import PropTypes from "prop-types";
import { React } from "react";
import Button from "../../components/Button/Button";
import styles from "./GuideTemplate.module.scss";
import { useDialog } from "./GuideTemplateContext";

const GuideTemplate = ({
  title = "",
  handleButtonClick = () => null,
  activeButton = 0,
  leftContent = () => null,
  rightContent = () => null,
  leftAppearance = () => null,
  onSave = () => null,
}) => {
  const { isOpen, closeDialog } = useDialog();
  const buttons = ["Content", "Appearance"];

  return (
    <Dialog
      open={isOpen}
      onClose={closeDialog}
      maxWidth='lg'
      PaperProps={{ style: { position: "static" } }}
    >
      <div className={styles.container}>
        <div className={styles.popup}>
          <div className={styles.header}>
            <span style={{ marginLeft: "5px" }}>{title}</span>
            <CloseOutlinedIcon
              style={{
                color: "#98A2B3",
                fontSize: "20px",
                cursor: "pointer",
              }}
              onClick={closeDialog}
            />
          </div>
          <div className={styles.content}>
            {/* Content and Appereance buttons */}
            <div className={styles.buttons}>
              {buttons.map((buttonName, index) => (
                <button
                  key={index}
                  className={classNames(styles.menuButton, {
                    [styles.active]: activeButton === index,
                  })}
                  onClick={() => handleButtonClick(index)}
                >
                  {buttonName}
                </button>
              ))}
            </div>
            <div className={styles.leftRightContent}>
              {activeButton === 1 ? leftAppearance() : leftContent()}
              {rightContent()}
            </div>
            <div className={styles.optionButtons}>
              <Button
                text='Cancel'
                buttonType='secondary-grey'
                onClick={() => {
                  closeDialog();
                }}
              />
              <Button text='Save' onClick={onSave} />
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

GuideTemplate.propTypes = {
  title: PropTypes.string,
  handleButtonClick: PropTypes.func,
  activeButton: PropTypes.number,
  leftContent: PropTypes.func,
  rightContent: PropTypes.func,
  leftAppearance: PropTypes.func,
  onSave: PropTypes.func,
};

export default GuideTemplate;
