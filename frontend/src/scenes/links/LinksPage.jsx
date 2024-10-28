import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Preview from "../../components/Links/Preview";
import { createLink } from "../../services/linkService";
import GuideTemplate from "../../templates/GuideTemplate/GuideTemplate";
import LinkAppearance from "./LinkAppearance";
import LinkContent from "./LinkContent";



const LinksPage = ({ items, setItems }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [showDemoItems, setShowDemoItems] = useState(false);
  const [showSettings, setShowSettings] = useState(false); // New state for showing settings
  const [activeBtn, setActiveBtn] = useState(0);
  const [linkToEdit, setLinkToEdit] = useState({});

  const handleDelete = () => {
    setPopupOpen(false);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const toggleSettings = (link = null) => {
    setShowSettings(!showSettings); // Toggle the settings visibility
    if (link) {
      setLinkToEdit(link);
    }
  };

  const rightContent = () => <Preview items={items} />;
  const leftContent = () => (
    <LinkContent
      listItems={items}
      setItems={setItems}
      toggleSettings={toggleSettings}
    />
  );
  const leftAppearance = () => <LinkAppearance />;

  return (
    <>
      <GuideTemplate
        title='New helper link'
        activeButton={activeBtn}
        handleButtonClick={setActiveBtn}
        rightContent={rightContent}
        leftContent={leftContent}
        leftAppearance={leftAppearance}
      />
      {showSettings && <div>Settings</div>}
    </>
  );
};

LinksPage.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
      id: PropTypes.number,
      order: PropTypes.number,
    })
  ),
  setItems: PropTypes.func,
};

export default LinksPage;
