import React from "react";
import DefaultPageTemplate from "../../templates/DefaultPageTemplate/DefaultPageTemplate";
import CreateHintPage from "./CreateHintPage";
import { ACTIVITY_TYPES_INFO } from "../../data/guideMainPageData";
import { useDialog } from "../../templates/GuideTemplate/GuideTemplateContext";

import { useNavigate } from "react-router";
import { getHints, deleteHint } from '../../services/hintServices';

const HintDefaultPage = () => {
  const { openDialog } = useDialog();
  const navigate = useNavigate();

  const getHintDetails = (hint) => ({
    title: `Hint ${hint.id}`,
    text: hint.header,
  });

  const navigateToCreate = (state) => {
    navigate('/hint/create', state);
  }
  
  return (
    <>
    <DefaultPageTemplate
      getItems={getHints}
      deleteItem={deleteHint}
      navigateToCreate={openDialog}
      itemType={ACTIVITY_TYPES_INFO.HINTS}
      itemTypeInfo={ACTIVITY_TYPES_INFO.HINTS}
      getItemDetails={getHintDetails}
    />
    <CreateHintPage />
    </>
  );
};

export default HintDefaultPage;
