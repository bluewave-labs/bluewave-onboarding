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
    </div>
  );
};

export default TestButton;
