import React, { useState } from "react";
import CreateActivityButton from "../../components/Button/CreateActivityButton/CreateActivityButton";
import ParagraphCSS from "../../components/ParagraphCSS/ParagraphCSS";
import { ACTIVITY_TYPES } from "../../data/createActivityButtonData";
import LinksPage from "./LinksPage";

const LinksDefaultPage = () => {
  const [showLinksPage, setShowLinksPage] = useState(false);

  const style = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div style={style}>
      {showLinksPage ? (
        <LinksPage items={[]} />
      ) : (
        <>
          <ParagraphCSS />
          <CreateActivityButton
            type={ACTIVITY_TYPES.HELPERLINKS}
            onClick={() => {
              setShowLinksPage(true);
            }}
          />
        </>
      )}
    </div>
  );
};

export default LinksDefaultPage;
