import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import Preview from "../../components/Links/Preview";
import Settings from "../../components/Links/Settings/Settings";
import { createHelper, updateHelper } from "../../services/helperLinkService";
import {
  createLink,
  deleteLink,
  getLinkById,
  updateLink,
} from "../../services/linkService";
import { HelperLinkContext } from "../../services/linksProvider";
import GuideTemplate from "../../templates/GuideTemplate/GuideTemplate";
import { emitToastError } from "../../utils/guideHelper";
import toastEmitter, { TOAST_EMITTER_KEY } from "../../utils/toastEmitter";
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
      try {
        const { id, ...rest } = helper;
        newHelper = await updateHelper(rest);
      } catch (err) {
        emitToastError(err);
      }
      createdLinks = await Promise.all(
        links.map(async (it) => {
          const { id, order, ...link } = it;
          try {
            const exists = await getLinkById(id);
            if (exists)
              return await updateOldLink({ ...it, helperId: helper.id });
            return await createNewLink({ ...link, helperId: helper.id });
          } catch (err) {
            emitToastError(err);
          }
        })
      );
      if (deletedLinks.length) {
        await Promise.all(
          deleteCurrLink.map(async (it) => {
            try {
              return await deleteCurrLink({ ...it, helperId: helper.id });
            } catch (err) {
              emitToastError(err);
            }
          })
        );
      }
    } else {
      try {
        const { id, ...rest } = helper;
        newHelper = await createHelper({ ...rest });
      } catch (err) {
        emitToastError(err);
      }
      createdLinks = await Promise.all(
        links.map(async (it) => {
          const { id, order, ...link } = it;
          try {
            return await createNewLink({ ...link, helperId: newHelper.id });
          } catch (err) {
            emitToastError(err);
          }
        })
      );
    }
    if (newHelper && createdLinks.every(Boolean)) {
      const toastMessage = helper.id
        ? "You edited this Helper Link"
        : "New Helper Link saved";
      toastEmitter.emit(TOAST_EMITTER_KEY, toastMessage);
      setShowNewLinksPopup(false);
      setHelper({});
      setLinks([]);
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
