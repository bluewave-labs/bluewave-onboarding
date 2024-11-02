import React from "react";
import DefaultPageTemplate from "../../templates/DefaultPageTemplate/DefaultPageTemplate";
import { ACTIVITY_TYPES_INFO } from "../../data/guideMainPageData";
import { useNavigate } from "react-router";
import { getHints, deleteHint } from '../../services/hintServices';

const HintDefaultPage = () => {
  const navigate = useNavigate();

  const getHintDetails = (hint) => ({
    title: `Hint ${hint.id}`,
    text: hint.header,
  });

  const navigateToCreate = (state) => {
    navigate('/hint/create', state);
  }
  
  return (
    <DefaultPageTemplate
      getItems={getHints}
      deleteItem={deleteHint}
      navigateToCreate={navigateToCreate}
      itemType={ACTIVITY_TYPES_INFO.HINTS}
      itemTypeInfo={ACTIVITY_TYPES_INFO.HINTS}
      getItemDetails={getHintDetails}
    />
  );
};

export default HintDefaultPage;
