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
        fontWeight: 400,
        backgroundColor: "var(--gray-50)",
        width: "100%",
        border: "1px solid var(--grey-border)",
        borderRadius: "10px",
        color: "var(--gray-400)",
        paddingX: "30px",
        paddingY: "20px",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textTransform: "none",
        transition: "box-shadow 0.3s ease",
        "&:hover": {
          border: "1px solid var(--gray-250)",
          backgroundColor: "var(--gray-100)",
          ".childSkeleton": {
            border: "1px solid var(--blue-300)",
          },
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
