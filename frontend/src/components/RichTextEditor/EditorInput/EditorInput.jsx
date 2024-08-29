import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./EditorInput.css";

const EditorInput = ({ value, onChange, modules }) => {
  return (
    <ReactQuill
      className="editor"
      value={value}
      onChange={onChange}
      modules={modules}
    />
  );
};

export default EditorInput;
