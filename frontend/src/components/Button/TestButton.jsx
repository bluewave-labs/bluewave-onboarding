import React from "react";
import Button from "./Button";

const TestButton = () => {
  const handleClick = (text) => {
    console.log(`${text} button clicked`);
  };

  return (
    <div>
      <Button
        text="Primary"
        onClick={() => handleClick("Primary")}
        variant="contained"
        className="button-primary"
      />
      <Button
        text="Secondary"
        onClick={() => handleClick("Secondary")}
        variant="outlined"
        className="button-secondary"
        style={{
          borderColor: "rgba(128, 128, 128, 0.2)",
        }}
      />
      <Button
        text="Error"
        onClick={() => handleClick("Error")}
        variant="contained"
        className="button-error"
      />
      <Button
        text="Primary"
        onClick={() => handleClick("Disabled Primary")}
        variant="outlined"
        className="button-disabled-primary"
        style={{
          color: "grey",
          backgroundColor: "#f3f4f7",
          textTransform: "none",
          borderColor: "rgba(128, 128, 128, 0.2)",
          fontWeight: "600",
        }}
        sx={{
          borderColor: "rgba(128, 128, 128, 0.2)",
        }}
      />
      <Button
        text="Secondary"
        onClick={() => handleClick("Disabled Secondary")}
        variant="outlined"
        className="button-disabled-secondary"
        style={{
          color: "grey",
          backgroundColor: "white",
          textTransform: "none",
          borderColor: "rgba(128, 128, 128, 0.2)",
          fontWeight: "600",
        }}
        sx={{
          borderColor: "rgba(128, 128, 128, 0.2)",
        }}
      />
      <Button
        text="Secondary"
        onClick={() => handleClick("Grey Secondary")}
        variant="outlined"
        className="button-grey-secondary"
        style={{
          color: "rgba(128, 128, 128, 0.9)",
          textTransform: "none",
        }}
      />
      <Button
        text="Secondary"
        onClick={() => handleClick("Purple Secondary")}
        variant="outlined"
        className="button-purple-secondary"
        style={{
          color: "rgba(127, 60, 217, 0.7)",
          textTransform: "none",
        }}
      />
    </div>
  );
};

export default TestButton;
