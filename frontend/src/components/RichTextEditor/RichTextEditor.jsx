import React, { useState, useEffect } from "react";
import EditorInput from "./EditorInput/EditorInput";
import EditorTabs from "./Tabs/EditorTabs";
import EditorToolbar from "./Toolbar/EditorToolbar";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";
import { Box } from "@mui/material";
import Proptypes from "prop-types";
import "./RichTextEditor.css";

const RichTextEditor = () => {
  const [mode, setMode] = useState("editor");
  const [content, setContent] = useState("");

  const modules = {
    toolbar: {
      container: "#toolbar",
    },
  };

  // log the editor content in html format
  // console.log(content);

  useEffect(() => {
    const removePlaceholder = () => {
      const linkInput = document.querySelector("input");
      if (linkInput) {
        linkInput.removeAttribute("placeholder");
      }
    };

    setTimeout(removePlaceholder, 1000);
  }, []);

  return (
    <Box className="container" sx={{ width: "500px" }}>
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
          <Box
            className="preview"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
            style={{
              opacity: mode === "preview" ? "1" : "0",
              zIndex: mode === "preview" ? "1" : "-1",
            }}
          />
        </Box>
      </Box>
      <EditorTabs className="tabs" mode={mode} setMode={setMode} />
    </Box>
  );
};

RichTextEditor.propTypes = {
  width: Proptypes.string,
};

export default RichTextEditor;
