import React, { useState } from "react";
import EditorInput from "./EditorInput/EditorInput";
import EditorTabs from "./Tabs/EditorTabs";
import EditorToolbar from "./Toolbar/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { Box } from "@mui/material";
import "./RichTextEditor.css";
import CustomTextField from "../TextFieldComponents/CustomTextField/CustomTextField";
import PreviewComponent from "./Preview/PreviewComponent";

const RichTextEditor = ({ previewBtnText }) => {
  const [mode, setMode] = useState("editor");
  const [content, setContent] = useState("");
  const [header, setHeader] = useState("");

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <Box className="container" sx={{ width: "500px" }}>
      {mode === "editor" ? (
        <>
          <CustomTextField
            labelText="Header"
            labelFontWeight={600}
            inputHeight="40px"
            value={header}
            onChange={(event) => {
              setHeader(event.target.value);
            }}
          />
          <div className="editor-label">
            <label>Content</label>
          </div>
          <Box className="row">
            <Box>
              <EditorToolbar mode={mode} />
            </Box>
            <Box className="editor-container">
              <EditorInput
                className="editor"
                value={content}
                onChange={setContent}
                modules={modules}
              />
            </Box>
          </Box>
        </>
      ) : (
        <PreviewComponent
          header={header}
          content={content}
          previewBtnText={previewBtnText}
        />
      )}
      <EditorTabs className="tabs" mode={mode} setMode={setMode} />
    </Box>
  );
};

export default RichTextEditor;
