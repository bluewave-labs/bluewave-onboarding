import React, { useState } from "react";
import EditorInput from "./EditorInput/EditorInput";
import EditorTabs from "./Tabs/EditorTabs";
import EditorToolbar from "./Toolbar/EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { Box } from "@mui/material";
import Proptypes from "prop-types";
import "./RichTextEditor.css";
import CustomTextField from "../TextFieldComponents/CustomTextField/CustomTextField";
import PreviewComponent from "./Preview/PreviewComponent";

const RichTextEditor = () => {
  const [mode, setMode] = useState("editor");
  const [content, setContent] = useState("");
  const [header, setHeader] = useState("");

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
  };

  // log the editor content in html format
  // console.log(content);

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
            <Box
              sx={{
                opacity: mode === "editor" ? 1 : 0.5,
                pointerEvents: mode === "editor" ? "all" : "none",
              }}
            >
              <EditorToolbar mode={mode} />
            </Box>
            <Box className="editor-preview-container">
              <Box>
                <EditorInput
                  className="editor"
                  mode={mode}
                  value={content}
                  onChange={setContent}
                  modules={modules}
                />
              </Box>
            </Box>
          </Box>
          {/* <EditorTabs className="tabs" mode={mode} setMode={setMode} /> */}
        </>
      ) : (
        <PreviewComponent header={header} content={content} />
      )}
      <EditorTabs className="tabs" mode={mode} setMode={setMode} />
    </Box>
  );
};

RichTextEditor.propTypes = {
  width: Proptypes.string,
};

export default RichTextEditor;
