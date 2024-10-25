import { Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardContainer from "../../components/Links/Card";
import Card from "../../components/Links/Card/Card";
import Preview from "../../components/Links/Preview";
import Settings from "../../components/Settings/Settings";
import ConfirmationPopup from "../../components/TourComponents/ConfirmationPopup/ConfirmationPopup";
import s from "./LinkPage.module.scss";

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
  const [showAppearance, setShowAppearance] = useState(false);
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
    <div className={s.container}>
      <div className={s.header}>
        <h2>New helper link</h2>
      </div>
      <div className={s.body}>
        <div className={s.body__header}>
          <button onClick={() => setShowAppearance(false)}>Content</button>
          <button onClick={() => setShowAppearance(true)}>Appearance</button>
        </div>
        <div className={s.body__content}>
          {showAppearance ? null : (
            <CardContainer>
              <h3 className={s.body__title}>Link items</h3>
              {listItems.map((item) => (
                <Card {...item} key={item.id} toggleSettings={toggleSettings} />
              ))}
              <Link className={s.link} onClick={toggleSettings}>
                + Add new link
              </Link>
            </CardContainer>
          )}
          <div className={s.preview}>
            <Preview items={listItems} />
          </div>
        </div>
      </div>

      {/* Settings Component - Position and Animation */}
      {showSettings && (
        <div className='settings-container'>
          <Settings onClose={toggleSettings} />
        </div>
      )}

      <ConfirmationPopup
        open={isPopupOpen}
        onConfirm={handleDelete}
        onCancel={handleClosePopup}
      />
    </div>
  );
};

export default LinksPage;
