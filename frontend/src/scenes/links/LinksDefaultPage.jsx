import React, { useEffect, useState } from "react";
import { ACTIVITY_TYPES_INFO } from "../../data/guideMainPageData";
import { getHelpers } from "../../services/helperLinkService";
import DefaultPageTemplate from "../../templates/DefaultPageTemplate/DefaultPageTemplate";
import NewLinksPopup from "./NewLinksPopup";

const LinksDefaultPage = () => {
  const [helpers, setHelpers] = useState([]);
  const [currentHelper, setCurrentHelper] = useState({});
  const [showNewLinkPopup, setShowNewLinkPopup] = useState(false);

  useEffect(() => {
    getHelpers().then(setHelpers);
  }, []);

  const style = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  };

  return (
    <div style={style}>
      <DefaultPageTemplate
        getItems={() => helpers}
        deleteItem={() => {}}
        navigateToCreate={() => setShowNewLinkPopup(true)}
        itemType={ACTIVITY_TYPES_INFO.HELPERLINKS}
        itemTypeInfo={ACTIVITY_TYPES_INFO.HELPERLINKS}
        getItemDetails={(helper) => ({
          title: helper.title,
        })}
      />
      {showNewLinkPopup && (
        <NewLinksPopup helper={currentHelper} setHelper={setCurrentHelper} />
      )}
    </div>
  );
};

export default LinksDefaultPage;
