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
        backgroundColor: "var(--background-color)",
        width: "100%",
        border: "1px solid var(--grey-border)",
        color: "var(--main-text-color)",
        paddingX: "30px",
        paddingY: "20px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          border: "1px solid var(--light-border-color)",
          backgroundColor: "var(--light-gray)",
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
  onClick: PropTypes.func.isRequired,
};

export default CreateActivityButton;
