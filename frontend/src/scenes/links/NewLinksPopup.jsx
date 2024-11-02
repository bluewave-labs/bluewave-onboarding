import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import Preview from "../../components/Links/Preview";
import Settings from "../../components/Links/Settings/Settings";
import { createHelper } from "../../services/helperLinkService";
import { getLinks } from "../../services/linkService";
import { HelperLinkContext } from "../../services/linksProvider";
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

const NewLinksPopup = ({ helper, setShowNewLinksPopup }) => {
  const [activeBtn, setActiveBtn] = useState(0);

  const { setHelper, links, setLinks, showSettings, toggleSettings } =
    useContext(HelperLinkContext);

  const renderLinks = async () => {
    const data = await getLinks(helper.id);
    setLinks(
      data
        .map((it) => ({ ...it, x: 0, y: 0 }))
        .sort((a, b) => a.order - b.order)
    );
  };

  useEffect(() => {
    if (helper.id) {
      renderLinks();
    }
  }, [helper]);

  const handleSaveHelper = async () => {
    const newHelper = await createHelper({ ...helper });
    if (newHelper) {
      setShowNewLinksPopup(false);
    }
  };

  const rightContent = () => <Preview />;
  const leftContent = () => <LinkContent />;
  const leftAppearance = () => <LinkAppearance />;

  return (
    <div className={s.new__container}>
      <GuideTemplate
        title='New helper link'
        activeButton={activeBtn}
        handleButtonClick={setActiveBtn}
        rightContent={rightContent}
        leftContent={leftContent}
        leftAppearance={leftAppearance}
        onSave={handleSaveHelper}
      />
      {showSettings && <Settings />}
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
  setShowNewLinksPopup: PropTypes.func,
};

export default NewLinksPopup;
