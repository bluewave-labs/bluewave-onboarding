import React, { useEffect, useState } from "react";
import CreateActivityButton from "../../components/Button/CreateActivityButton/CreateActivityButton";
import ParagraphCSS from "../../components/ParagraphCSS/ParagraphCSS";
import { ACTIVITY_TYPES } from "../../data/createActivityButtonData";
import { getHelpers } from "../../services/helperLinkService";
import HelperLinksPage from "./HelperLinkPage";
import LinksPage from "./LinksPage";

const LinksDefaultPage = () => {
  const [showLinksPage, setShowLinksPage] = useState(false);
  const [helpers, setHelpers] = useState([]);
  const [currentHelper, setCurrentHelper] = useState({});

  useEffect(() => {
    getHelpers().then((data) => {
      setHelpers(data);
    });
  }, []);

  const style = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  };

  const Content = () =>
    helpers.length ? (
      <HelperLinksPage
        helpers={helpers}
        setCurrentHelper={setCurrentHelper}
        setHelpers={setHelpers}
        setShowLinksPage={setShowLinksPage}
      />
    ) : (
      <LinksPage helper={currentHelper} setHelper={setCurrentHelper} />
    );

  return (
    <div style={style}>
      {showLinksPage ? (
        <Content />
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
