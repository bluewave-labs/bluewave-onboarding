import React, { useState } from "react";
import "./EditorToolbar.css";
import { Button } from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  InsertLink,
  FormatListBulleted,
  FormatListNumbered,
  Title,
} from "@mui/icons-material";
import LinkDialog from "../EditorLinkDialog/LinkDialog";

const Toolbar = ({ editor }) => {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [isLinkActive, setIsLinkActive] = useState(false);

  if (!editor) {
    return null;
  }

  const handleClickOpen = () => {
    const currentLink = editor.getAttributes("link").href;
    setUrl(currentLink || "");
    setOpen(true);
    setIsLinkActive(!!currentLink);
  };

  const handleClose = () => {
    setOpen(false);
    setUrl("");
  };

  const handleInsertLink = () => {
    if (url) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
    handleClose();
  };

  const handleOpenLink = () => {
    window.open(url, "_blank");
    handleClose();
  };

  return (
    <div className="toolbar-container">
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
      >
        <FormatBold />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
      >
        <FormatItalic />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Title />
      </Button>
      <Button onClick={handleClickOpen}>
        <InsertLink />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
      >
        <FormatListBulleted />
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
      >
        <FormatListNumbered />
      </Button>

      <LinkDialog
        open={open}
        handleClose={handleClose}
        url={url}
        setUrl={setUrl}
        isLinkActive={isLinkActive}
        handleInsertLink={handleInsertLink}
        handleOpenLink={handleOpenLink}
      />
    </div>
  );
};

export default Toolbar;
