import DropdownList from "@components/DropdownList/DropdownList";
import RadioButton from "@components/RadioButton/RadioButton";
import CustomTextField from "@components/TextFieldComponents/CustomTextField/CustomTextField";
import PropTypes from "prop-types";
import React from "react";
import styles from "./BannerLeftContent.module.scss";

const BannerLeftContent = ({
  setIsTopPosition,
  url,
  setUrl,
  setButtonAction,
  isTopPosition,
  buttonAction,
  actionUrl,
  setActionUrl,
}) => {
  const handleSetUrl = (event) => {
    setUrl(event.target.value);
  };

  const handleSetActionUrl = (event) => {
    setActionUrl(event.target.value);
  };
const BannerLeftContent = ({
  setIsTopPosition,
  url,
  setUrl,
  setButtonAction,
  isTopPosition,
  buttonAction,
  actionUrl,
  setActionUrl,
}) => {
  const handleSetUrl = (event) => {
    setUrl(event.target.value);
  };

  const handleSetActionUrl = (event) => {
    setActionUrl(event.target.value);
  };

  const handleActionChange = (newAction) => {
    setButtonAction(newAction);
  };
  const handleActionChange = (newAction) => {
    setButtonAction(newAction);
  };

  const handlePositionChange = (newPosition) => {
    setIsTopPosition(newPosition);
  };
  const handlePositionChange = (newPosition) => {
    setIsTopPosition(newPosition);
  };

  return (
    <div className={styles.container}>
      <h2>Action</h2>
      <DropdownList
        actions={["No action", "Open URL", "Open URL in a new tab"]}
        onActionChange={handleActionChange}
        selectedActionString={buttonAction}
      />
      <h2>Position</h2>
      <div className={styles.radioContent}>
        <RadioButton
          label='Top (centered)'
          checked={isTopPosition}
          onChange={() => handlePositionChange(true)}
        />
      </div>
      <div className={styles.radioContent}>
        <RadioButton
          label='Bottom (centered)'
          checked={!isTopPosition}
          onChange={() => handlePositionChange(false)}
        />
      </div>
  return (
    <div className={styles.container}>
      <h2>Action</h2>
      <DropdownList
        actions={["No action", "Open URL", "Open URL in a new tab"]}
        onActionChange={handleActionChange}
        selectedActionString={buttonAction}
      />
      <h2>Position</h2>
      <div className={styles.radioContent}>
        <RadioButton
          label='Top (centered)'
          checked={isTopPosition}
          onChange={() => handlePositionChange(true)}
        />
      </div>
      <div className={styles.radioContent}>
        <RadioButton
          label='Bottom (centered)'
          checked={!isTopPosition}
          onChange={() => handlePositionChange(false)}
        />
      </div>

      <h2 style={{ marginBottom: 0, marginTop: "1.2rem" }}>URL</h2>
      <CustomTextField
        TextFieldWidth='241px'
        value={url}
        onChange={handleSetUrl}
      />

      <h2 style={{ marginBottom: 0, marginTop: "1.2rem" }}>Action URL</h2>
      <CustomTextField
        TextFieldWidth='241px'
        value={actionUrl}
        onChange={handleSetActionUrl}
      />
    </div>
  );
      <h2 style={{ marginBottom: 0, marginTop: "1.2rem" }}>URL</h2>
      <CustomTextField
        TextFieldWidth='241px'
        value={url}
        onChange={handleSetUrl}
      />

      <h2 style={{ marginBottom: 0, marginTop: "1.2rem" }}>Action URL</h2>
      <CustomTextField
        TextFieldWidth='241px'
        value={actionUrl}
        onChange={handleSetActionUrl}
      />
    </div>
  );
};

export default BannerLeftContent;
BannerLeftContent.propTypes = {
  setIsTopPosition: PropTypes.func,
  url: PropTypes.string,
  setUrl: PropTypes.func,
  setButtonAction: PropTypes.func,
  isTopPosition: PropTypes.bool,
  buttonAction: PropTypes.string,
  actionUrl: PropTypes.string,
  setActionUrl: PropTypes.func,
};
