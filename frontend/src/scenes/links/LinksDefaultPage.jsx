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
  const [showNewLinkPopup, setShowNewLinkPopup] = useState(false);

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
        <DefaultPageTemplate
          getItems={() => getHelpers()}
          deleteItem={deleteHelper}
          navigateToCreate={async ({ state }) => {
            if (state && state.isEdit) {
              const data = await getHelperById(state.id);
              setCurrentHelper(data);
            }
            setShowNewLinkPopup(true);
          }}
          itemType={ACTIVITY_TYPES_INFO.HELPERLINKS}
          itemTypeInfo={ACTIVITY_TYPES_INFO.HELPERLINKS}
          getItemDetails={(helper) => ({
            title: helper.title,
          })}
        />
        {showNewLinkPopup && (
          <NewLinksPopup
            currentHelper={currentHelper}
            setHelper={setCurrentHelper}
            setShowNewLinksPopup={setShowNewLinkPopup}
          />
        )}
      </div>
    </HelperLinkProvider>
  );
};

export default LinksDefaultPage;
