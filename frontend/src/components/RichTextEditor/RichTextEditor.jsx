import React, { useState, useEffect } from "react";
import "./RichTextEditor.css";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Toolbar from "./Toolbar/EditorToolbar";
import PopupComponent from "../../products/Popup/PopupComponent";
import EditorTabs from "./Tabs/EditorTabs";
import CustomTextField from "../TextFieldComponents/CustomTextField/CustomTextField";

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
  popupSize,
  sx,
}) => {
  const [htmlContent, setHtmlContent] = useState("");
  const [mode, setMode] = useState("editor");
  const [content, setContent] = useState(initialContent ?? "");
  const [header, setHeader] = useState(initialHeader ?? "");

  useEffect(() => {
    if (initialSetContent) initialSetContent(content);
  }, [content]);

  const handleHeaderChange = (e) => {
    const newHeader = e.target.value;
    setHeader(newHeader);
    if (initialSetHeader) initialSetHeader(newHeader);
    console.log(header);
  };

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        bulletList: false,
        orderedList: false,
      }),
      Heading,
      Link,
      BulletList,
      OrderedList,
    ],
    onUpdate: ({ editor }) => {
      setHtmlContent(editor.getHTML());
    },
  });

  return (
    <div style={{ position: 'relative', ...sx }}>
      {mode === "editor" ? (
        <>
          <CustomTextField
            labelText="Header"
            labelFontWeight={600}
            inputHeight="40px"
            TextFieldWidth={"100%"}
            value={header}
            onChange={handleHeaderChange}
            style={{ marginBottom: "2rem" }}
          />
          <label className="editor-label">Content</label>
          <div className="editor-container">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
          </div>
        </>
      ) : (
        <PopupComponent
          header={header}
          content={htmlContent}
          previewBtnText={previewBtnText}
          headerBackgroundColor={headerBackgroundColor}
          headerColor={headerColor}
          buttonBackgroundColor={buttonBackgroundColor}
          buttonTextColor={buttonTextColor}
          textColor={textColor}
          popupSize={popupSize}
        />
      )}
      <EditorTabs mode={mode} setMode={setMode}
        sx={{
          position: 'absolute',
          top: '400px',
          left: 0,
        }} />
    </div>
  );
};

export default RichTextEditor;
