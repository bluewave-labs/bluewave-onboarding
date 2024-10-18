import React, { useMemo } from "react";
import ColorTextField from "../../ColorTextField/ColorTextField";
import "./HintLeftAppearance.css";

const HintLeftAppearance = ({ data = [] }) => {
  const content = useMemo(() => {
    if (data.length === 0) {
      return <div className="hint-appearance-container">No data available</div>;
    }

    return (
      <div className="hint-appearance-container">
        {data.map(({ stateName, state, setState }) => (
          <div key={stateName}>
            <h2 className="hint-state-name">{stateName}</h2>
            <div className="hint-appearance-color">
              <ColorTextField value={state} onChange={setState} />
            </div>
          </div>
        ))}
      </div>
    );
  }, [data]);

  return content;
};

export default HintLeftAppearance;
