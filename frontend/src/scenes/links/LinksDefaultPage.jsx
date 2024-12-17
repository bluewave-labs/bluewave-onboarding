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
import { useDialog } from "../../templates/GuideTemplate/GuideTemplateContext";

const LinksDefaultPage = () => {
  const [currentHelper, setCurrentHelper] = useState({});
  const [currentLinks, setCurrentLinks] = useState([]);
  const [showNewLinksPopup, setShowNewLinksPopup] = useState(false);
  const [helperState, setHelperState] = useState(null)
  const [itemsUpdated, setItemsUpdated] = useState(false);

  const { openDialog, isOpen } = useDialog();

  const style = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  };

  return (
    <>
      <HelperLinkProvider>
        <div style={style}>
          <NewLinksPopup
            currentHelper={currentHelper}
            currentLinks={currentLinks}
            setHelper={setCurrentHelper}
            setShowNewLinksPopup={setShowNewLinksPopup}
            helperState={helperState}
            setItemsUpdated={setItemsUpdated}
          />
          <DefaultPageTemplate
            getItems={getHelpers}
            deleteItem={deleteHelper}
            itemsUpdated={itemsUpdated}
            onEditItem={async (id) => {
              const { links, ...data } = await getHelperById(id);
              setCurrentHelper(data);
              setCurrentLinks(links.sort((a, b) => a.order - b.order));
              setHelperState({ isEdit: true, id });
              openDialog();
            }}
            navigateToCreate={() => {
              setCurrentHelper({
                title: "",
                headerBackgroundColor: "#F8F9F8",
                linkFontColor: "#344054",
                iconColor: "#7F56D9",
              });
              setHelperState({ isEdit: false });
              setCurrentLinks([]);
              openDialog();
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
        </div>
      </HelperLinkProvider>
    </>
  );
};

export default LinksDefaultPage;
