import React from "react";
import ColorTextField from "../../ColorTextField/ColorTextField";
import "./HintLeftAppearance.css";

const HintLeftAppearance = ({ data = [] }) => {
  return (
    <div className="hint-appearance-container">
      {data.map(({ stateName, state, setState }) => (
        <div key={stateName}>
          <h2 className="hint-state-name">{stateName}</h2>
          <div className="hint-appearance-color" style={{width: "241px"}}>
            <ColorTextField value={state} onChange={setState} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HintLeftAppearance;
