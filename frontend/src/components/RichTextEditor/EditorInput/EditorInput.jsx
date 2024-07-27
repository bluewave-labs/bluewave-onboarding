import React from "react";
import { Box } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./EditorInput.css";

const EditorInput = ({ value, onChange, modules, mode }) => {
  return (
    <Box>
      <ReactQuill
        className="editor"
        style={{
          opacity: mode === "editor" ? 1 : 0,
          zIndex: mode === "editor" ? 1 : -1,
        }}
        value={value}
        onChange={onChange}
        modules={modules}
        readOnly={mode === "preview"}
      />
    </Box>
  );
};

export default EditorInput;
