import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./EditorInput.css";

const EditorInput = ({ value, onChange, modules }) => {
  return (
    <>
      <ReactQuill
        className="editor"
        value={value}
        onChange={onChange}
        modules={modules}
      />
    </>
  );
};

export default EditorInput;
