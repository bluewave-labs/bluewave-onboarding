import React from "react";
import { Tabs, Tab } from "@mui/material";
import "./EditorTabs.css";

const EditorTabs = ({ mode, setMode }) => (
  <Tabs
    className="editor-tabs"
    value={mode}
    onChange={(event, newValue) => setMode(newValue)}
    TabIndicatorProps={{
      style: {
        display: "none",
      },
    }}
  >
    <Tab className="tab" label="Editor" value="editor" />
    <Tab className="tab" label="Preview" value="preview" />
  </Tabs>
);

export default EditorTabs;
