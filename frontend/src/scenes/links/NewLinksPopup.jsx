import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import Preview from "../../components/Links/Preview";
import Settings from "../../components/Links/Settings/Settings";
import { createHelper, updateHelper } from "../../services/helperLinkService";
import { createLink, deleteLink, updateLink } from "../../services/linkService";
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

const NewLinksPopup = ({
  currentHelper,
  setShowNewLinksPopup,
  currentLinks,
}) => {
  const [activeBtn, setActiveBtn] = useState(0);

  const { showSettings, helper, setHelper, links, deletedLinks, setLinks } =
    useContext(HelperLinkContext);

  useEffect(() => {
    setHelper(currentHelper);
    if (currentLinks.length) {
      setLinks(currentLinks);
    }
  }, []);

  const createNewLink = async (it) => {
    return await createLink(it);
  };

  const updateOldLink = async (it) => {
    return await updateLink(it);
  };

  const deleteCurrLink = async (it) => {
    return await deleteLink(it);
  };

  const handleSaveHelper = async () => {
    let newHelper;
    let createdLinks;
    if (helper.id) {
      newHelper = await updateHelper(helper);
      createdLinks = await Promise.all(
        links.map(async (it) => {
          if (it.id) return await updateOldLink({ ...it, helperId: helper.id });
          return await createNewLink({ ...it, helperId: helper.id });
        })
      );
      if (deletedLinks.length) {
        await Promise.all(
          deleteCurrLink.map(async (it) =>
            deleteCurrLink({ ...it, helperId: helper.id })
          )
        );
      }
    } else {
      newHelper = await createHelper({ ...helper });
      createdLinks = await Promise.all(
        links.map(async (it) => {
          return await createNewLink({ ...it, helperId: newHelper.id });
        })
      );
    }

    if (newHelper && createdLinks) {
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
  currentHelper: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    headerBackgroundColor: PropTypes.string,
    linkFontColor: PropTypes.string,
    iconColor: PropTypes.string,
  }),
  currentLinks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      url: PropTypes.string,
      target: PropTypes.string,
      x: PropTypes.number,
      y: PropTypes.number,
    })
  ),
  setShowNewLinksPopup: PropTypes.func,
};

export default NewLinksPopup;
