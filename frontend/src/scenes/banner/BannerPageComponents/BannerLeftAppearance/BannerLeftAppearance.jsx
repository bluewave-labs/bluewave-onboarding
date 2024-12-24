import { React } from "react";
import styles from "./BannerLeftAppearance.module.scss";
import ColorTextField from "@components/ColorTextField/ColorTextField";

const BannerLeftAppearance = ({ state, updateState }) => {

  // Define the setter functions here
  const setBackgroundColor = (value) => {
    updateState({ backgroundColor: value });
  };

  const setFontColor = (value) => {
    updateState({ fontColor: value });
  };

  return (
    <div className={styles.container}>
      <h2>Background Color</h2>
      <div className={styles.color}>
        <ColorTextField
          value={state.backgroundColor}
          onChange={setBackgroundColor}  // Directly pass the function
        />
      </div>
      <h2>Font Color</h2>
      <div className={styles.color}>
        <ColorTextField
          value={state.fontColor}
          onChange={setFontColor}  // Directly pass the function
        />
      </div>
    </div>
  );
};

export default BannerLeftAppearance;
