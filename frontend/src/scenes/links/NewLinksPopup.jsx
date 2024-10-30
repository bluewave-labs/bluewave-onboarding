import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Preview from "../../components/Links/Preview";
import Settings from "../../components/Links/Settings/Settings";
import { createHelper } from "../../services/helperLinkService";
import { getLinks } from "../../services/linkService";
import GuideTemplate from "../../templates/GuideTemplate/GuideTemplate";
import LinkAppearance from "./LinkAppearance";
import LinkContent from "./LinkContent";
import s from "./LinkPage.module.scss";

const demoItems = [
  {
    title: "Material UI",
    url: "https://mui.com/material-ui/api/switch/",
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

const NewLinksPopup = ({ helper, setHelper }) => {
  const [activeBtn, setActiveBtn] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [items, setItems] = useState([]);

  const renderLinks = async () => {
    const data = await getLinks(helper.id);
    setItems(
      data
        .map((it) => ({ ...it, x: 0, y: 0 }))
        .sort((a, b) => a.order - b.order)
    );
  };

  const createNewHelper = async () => {
    const data = await createHelper({ title: "Help center" });
    setHelper(data);
  };

  useEffect(() => {
    if (helper.id) {
      renderLinks();
    } else {
      createNewHelper();
    }
  }, [helper]);

  const toggleSettings = (e, link = null) => {
    if (e.target.closest("#delete") || e.target.closest("#drag")) return;
    if (showSettings) {
      renderLinks();
    }
    if (!showSettings && link) {
      localStorage.setItem("newLink", JSON.stringify(link));
    }
    setShowSettings(!showSettings); // Toggle the settings visibility
  };

  const rightContent = () => <Preview items={items} helper={helper} />;
  const leftContent = () => (
    <LinkContent
      items={items}
      setItems={setItems}
      toggleSettings={toggleSettings}
      helperId={helper.id}
    />
  );
  const leftAppearance = () => (
    <LinkAppearance helper={helper} setHelper={setHelper} />
  );

  return (
    <div className={s.new__container}>
      <GuideTemplate
        title='New helper link'
        activeButton={activeBtn}
        handleButtonClick={setActiveBtn}
        rightContent={rightContent}
        leftContent={leftContent}
        leftAppearance={leftAppearance}
      />
      {showSettings && (
        <Settings onClose={toggleSettings} helperId={helper.id} />
      )}
    </div>
  );
};

NewLinksPopup.propTypes = {
  helper: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    headerBackgroundColor: PropTypes.string,
    linkFontColor: PropTypes.string,
    iconColor: PropTypes.string,
  }),
  setHelper: PropTypes.func,
};

export default NewLinksPopup;
