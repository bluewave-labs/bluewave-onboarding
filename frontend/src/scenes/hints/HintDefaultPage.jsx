import React, { useState } from "react";
import DefaultPageTemplate from "../../templates/DefaultPageTemplate/DefaultPageTemplate";
import CreateHintPage from "./CreateHintPage";
import { ACTIVITY_TYPES_INFO } from "../../data/guideMainPageData";
import { useDialog } from "../../templates/GuideTemplate/GuideTemplateContext";
import { getHints, deleteHint } from '../../services/hintServices';

const HintDefaultPage = () => {
  const [itemsUpdated, setItemsUpdated] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [itemId, setItemId] = useState(null);
  const { openDialog } = useDialog();

  const openEditHintDialog = (id) => {
    setIsEdit(true);
    setItemId(id);
    openDialog();
  };

  const openNewHintDialog = () => {
    setIsEdit(false);
    setItemId(null);
    openDialog();
  };

  const getHintDetails = (hint) => ({
    title: `Hint ${hint.id}`,
    text: hint.header,
  });
  
  return (
    <>
      <DefaultPageTemplate
        getItems={getHints}
        deleteItem={deleteHint}
        navigateToCreate={openNewHintDialog}
        itemType={ACTIVITY_TYPES_INFO.HINTS}
        itemTypeInfo={ACTIVITY_TYPES_INFO.HINTS}
        getItemDetails={getHintDetails}
        itemsUpdated={itemsUpdated}
        onEditItem={openEditHintDialog}
      />
      <CreateHintPage
        isEdit={isEdit}
        itemId={itemId}
        setItemsUpdated={setItemsUpdated}
      />
    </>
  );
};

export default HintDefaultPage;
