import React from "react";
import DefaultPageTemplate from "../../templates/DefaultPageTemplate/DefaultPageTemplate";
import CreateHintPage from "./CreateHintPage";
import { ACTIVITY_TYPES_INFO } from "../../data/guideMainPageData";
import { useDialog } from "../../templates/GuideTemplate/GuideTemplateContext";

const mockHints = [
  {
    idItem: 184293,
    title: "Main dashboard - feature hint",
    text: "This pops up the first time a user logs in to the dashboard.",
  },
  {
    idItem: 194294,
    title: "Main dashboard - password hint",
    text: "This pops up the first time a user logs in to the dashboard.",
  },
];

const HintDefaultPage = () => {
  const { openDialog } = useDialog();

  return (
    <>
      <DefaultPageTemplate
        getItems={() => mockHints}
        deleteItem={() => {}}
        navigateToCreate={openDialog}
        itemType={ACTIVITY_TYPES_INFO.HINTS}
        itemTypeInfo={ACTIVITY_TYPES_INFO.HINTS}
        getItemDetails={(hint) => ({
          title: hint.title,
          text: hint.text,
        })}
      />
      <CreateHintPage />
    </>
  );
};

export default HintDefaultPage;
