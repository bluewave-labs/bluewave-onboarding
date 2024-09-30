import React, { useState, useEffect } from "react";
import "./RichTextEditor.css";
import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Toolbar from "./Toolbar/EditorToolbar";
import PreviewComponent from "./Preview/PreviewComponent";
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
    <div style={sx}>
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
        <PreviewComponent
          header={header}
          content={htmlContent}
          previewBtnText={previewBtnText}
          headerBackgroundColor={headerBackgroundColor}
          headerColor={headerColor}
          buttonBackgroundColor={buttonBackgroundColor}
          buttonTextColor={buttonTextColor}
          textColor={textColor}
        />
      )}
      <EditorTabs mode={mode} setMode={setMode} sx={{ marginTop: "1rem" }} />
    </div>
  );
};

export default RichTextEditor;
