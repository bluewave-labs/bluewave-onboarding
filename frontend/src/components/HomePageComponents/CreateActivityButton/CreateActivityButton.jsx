import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

const CreateActivityButton = ({
  placeholder = "",
  skeletonType,
  onClick = () => {},
}) => {
  return (
    <Button
      variant="text"
      onClick={onClick}
      sx={{
        display: "flex",
        backgroundColor: "grey.100",
        width: "100%",
        border: "0.5px solid var(--grey-border)",
        color: "var(--main-text-color)",
        paddingX: "30px",
        paddingY: "20px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          border: "0.5px solid #d1d5db",
          backgroundColor: "grey.200",
        },
      }}
    >
      {skeletonType}
      {placeholder}
    </Button>
  );
};

CreateActivityButton.propTypes = {
  skeletonType: PropTypes.node,
  placeholder: PropTypes.string,
  onButtonClick: PropTypes.func.isRequired,
};

export default CreateActivityButton;
