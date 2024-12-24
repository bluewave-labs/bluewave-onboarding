import DropdownList from "@components/DropdownList/DropdownList";
import RadioButton from "@components/RadioButton/RadioButton";
import CustomTextField from "@components/TextFieldComponents/CustomTextField/CustomTextField";
import PropTypes from "prop-types";
import React from "react";
import styles from "./BannerLeftContent.module.scss";

const BannerLeftContent = ({
  state,
  updateState,
}) => {
  const handleInputChange = (key) => (event) => {
    updateState({ [key]: event.target.value });
  };

  const handleBooleanChange = (key, value) => () => {
    updateState({ [key]: value });
  };

  return (
    <div className={styles.container}>
      <h2>Action</h2>
      <DropdownList
        actions={["No action", "Open URL", "Open URL in a new tab"]}
        onActionChange={(newAction) => updateState({ buttonAction: newAction })}
        selectedActionString={state.buttonAction}
      />
      <h2 style={{ marginBottom: "10px" }}>Position</h2>
      <div className={styles.radioContent}>
        <RadioButton
          label="Top (centered)"
          checked={state.isTopPosition}
          onChange={handleBooleanChange("isTopPosition", true)}
        />
      </div>
      <div className={styles.radioContent}>
        <RadioButton
          label="Bottom (centered)"
          checked={!state.isTopPosition}
          onChange={handleBooleanChange("isTopPosition", false)}
        />
      </div>

      <h2>URL</h2>
      <CustomTextField
        TextFieldWidth="241px"
        value={state.url}
        onChange={handleInputChange("url")}
      />

      <h2>Action URL</h2>
      <CustomTextField
        TextFieldWidth="241px"
        value={state.actionUrl}
        onChange={handleInputChange("actionUrl")}
      />
    </div>
  );
};

export default BannerLeftContent;

BannerLeftContent.propTypes = {
  state: PropTypes.shape({
    url: PropTypes.string,
    buttonAction: PropTypes.string,
    isTopPosition: PropTypes.bool,
    actionUrl: PropTypes.string,
  }),
  updateState: PropTypes.func.isRequired,
};
