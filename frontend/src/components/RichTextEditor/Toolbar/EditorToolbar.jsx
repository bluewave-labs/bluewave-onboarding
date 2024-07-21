import React from "react";
import "react-quill/dist/quill.snow.css";
import { Box } from "@mui/material";
import "./EditorToolbar.css";

const EditorToolbar = () => {
  return (
    <Box id="toolbar">
      <select className="ql-header" defaultValue="">
        <option value="1">Heading 1</option>
        <option value="2">Heading 2</option>
        <option value="">Normal</option>
      </select>
      <button className="ql-bold"></button>
      <button className="ql-italic"></button>
      <button className="ql-link"></button>
      <button className="ql-list" value="bullet"></button>
      <button className="ql-list" value="ordered"></button>
    </Box>
  );
};

export default EditorToolbar;
