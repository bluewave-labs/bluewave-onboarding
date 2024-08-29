import React, { useState, useEffect} from "react";
import EditorInput from "./EditorInput/EditorInput";
import EditorTabs from "./Tabs/EditorTabs";
import EditorToolbar from "./Toolbar/EditorToolbar";
import "react-quill-new/dist/quill.snow.css";
import { Box } from "@mui/material";
import "./RichTextEditor.css";
import CustomTextField from "../TextFieldComponents/CustomTextField/CustomTextField";
import PreviewComponent from "./Preview/PreviewComponent";

const RichTextEditor = ({
  previewBtnText,
  content: initialContent,
  setContent: initialSetContent,
  header: initialHeader,
  setHeader: initialSetHeader,
  headerBackgroundColor,
  headerColor,
  textColor,
  buttonBackgroundColor,
  buttonTextColor,
  sx }) => {

  const [content, setContent] = useState(initialContent ?? "");
  const [header, setHeader] = useState(initialHeader ?? "");

  useEffect(() => {
    if (initialSetContent) initialSetContent(content);
  }, [content])

  const handleHeaderChange = (e) => {
    const newHeader = e.target.value;
    setHeader(newHeader);
    if (initialSetHeader) initialSetHeader(newHeader);
    console.log(header);
  };

  const [mode, setMode] = useState("editor");
  const modules = {
    toolbar: {
      container: "#toolbar",
    },
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <Box className="container" sx={sx}>
      {mode === "editor" ? (
        <>
          <CustomTextField
            labelText="Header"
            labelFontWeight={600}
            inputHeight="40px"
            TextFieldWidth={'100%'}
            value={header}
            onChange={handleHeaderChange}
            style={{ marginBottom: '2rem' }}
          />
          <label className="editor-label">Content</label>

          <Box className="row">
            <EditorToolbar mode={mode} />
            <EditorInput
              value={content}
              onChange={setContent}
              modules={modules}
            />
          </Box>
        </>
      ) : (
        <PreviewComponent
          header={header}
          content={content}
          previewBtnText={previewBtnText}
          headerBackgroundColor={headerBackgroundColor}
          headerColor={headerColor}
          buttonBackgroundColor={buttonBackgroundColor}
          buttonTextColor={buttonTextColor}
          textColor={textColor}
        />
      )}
      <EditorTabs mode={mode} setMode={setMode} sx={{ marginTop: '1rem' }} />
    </Box>
  );
};

export default RichTextEditor;
