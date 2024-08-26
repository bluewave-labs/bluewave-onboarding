import React from 'react';
import ParagraphCSS from '../ParagraphCSS/ParagraphCSS';
import CreateActivityButton from '../Button/CreateActivityButton/CreateActivityButton';


const CreateActivityInnerPage = ({onClick, type }) => {
    const style = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    };

  return (
    <div style={style}>
      <ParagraphCSS />
      <CreateActivityButton
        type={type}
        onClick={onClick}
      />
    </div>
  );
};

export default CreateActivityInnerPage;
