import React, { useEffect, useState } from "react";
import Preview from "../../components/Links/Preview";
import GuideTemplate from "../../templates/GuideTemplate/GuideTemplate";
import LinkContent from "./LinkContent";
import LinkAppearance from "./LinkAppearance";

const demoItems = [
  {
    title: "Portfolio",
    url: "https://portfolio-v3-brown.vercel.app/",
    order: 2,
    id: 1,
  },
  {
    title: "Blue Wave",
    url: "https://bluewavelabs.ca",
    order: 1,
    id: 2,
  },
  {
    title: "Sequelize",
    url: "https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/",
    order: 3,
    id: 3,
  },
];

const LinksPage = ({ items }) => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [showDemoItems, setShowDemoItems] = useState(false);
  const [showSettings, setShowSettings] = useState(false); // New state for showing settings
  const [activeBtn, setActiveBtn] = useState(0);
  const [linkToEdit, setLinkToEdit] = useState({});

  useEffect(() => {
    setShowDemoItems(items.length === 0);
  }, [items]);

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

  const listItems = (showDemoItems ? demoItems : items).sort(
    (a, b) => a.order - b.order
  );

  return (
    <GuideTemplate
      title='New helper link'
      activeButton={activeBtn}
      handleButtonClick={setActiveBtn}
      rightContent={() => <Preview items={listItems} />}
      leftContent={() => (
        <LinkContent
          listItems={listItems}
          toggleSettings={toggleSettings}
        />
      )}
      leftAppearance={() => <LinkAppearance />}
    />
  );
};

export default LinksPage;
