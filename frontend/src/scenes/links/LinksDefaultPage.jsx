import React, { useState } from "react";
import { ACTIVITY_TYPES_INFO } from "../../data/guideMainPageData";
import {
  deleteHelper,
  getHelperById,
  getHelpers,
} from "../../services/helperLinkService";
import HelperLinkProvider from "../../services/linksProvider";
import DefaultPageTemplate from "../../templates/DefaultPageTemplate/DefaultPageTemplate";
import NewLinksPopup from "./NewLinksPopup";

const LinksDefaultPage = () => {
  const [currentHelper, setCurrentHelper] = useState({});
  const [currentLinks, setCurrentLinks] = useState([]);
  const [showNewLinkPopup, setShowNewLinkPopup] = useState(false);
  const [helperState, setHelperState] = useState(null)

  const style = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  };

  return (
    <HelperLinkProvider>
      <div style={style}>
        {showNewLinkPopup ? (
          <NewLinksPopup
            currentHelper={currentHelper}
            currentLinks={currentLinks}
            setHelper={setCurrentHelper}
            setShowNewLinksPopup={setShowNewLinkPopup}
            helperState={helperState}
          />
        ) : (
          <DefaultPageTemplate
            getItems={getHelpers}
            deleteItem={deleteHelper}
            navigateToCreate={async ({ state }) => {
              if (state?.isEdit) {
                const { links, ...data } = await getHelperById(state.id);
                setCurrentHelper(data);
                setCurrentLinks(links.sort((a, b) => a.order - b.order));
                setHelperState(state)
              } else {
                setCurrentHelper({
                  title: "",
                  headerBackgroundColor: "#F8F9F8",
                  linkFontColor: "#344054",
                  iconColor: "#7F56D9",
                });
              }
              setShowNewLinkPopup(true);
            }}
            itemType={ACTIVITY_TYPES_INFO.HELPERLINKS}
            itemTypeInfo={ACTIVITY_TYPES_INFO.HELPERLINKS}
            getItemDetails={(helper) => ({
              title: helper.title,
              headerBackgroundColor: helper.headerBackgroundColor,
              linkFontColor: helper.linkFontColor,
              iconColor: helper.iconColor,
            })}
          />
        )}
      </div>
    </HelperLinkProvider>
  );
};

export default LinksDefaultPage;
