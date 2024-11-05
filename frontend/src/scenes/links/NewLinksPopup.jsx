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

const NewLinksPopup = ({
  currentHelper,
  setShowNewLinksPopup,
  currentLinks,
  helperState,
}) => {
  const [activeBtn, setActiveBtn] = useState(0);

  const {
    showSettings,
    helper,
    setHelper,
    links,
    deletedLinks,
    setLinks,
    helperToEdit,
    setHelperToEdit,
  } = useContext(HelperLinkContext);

  useEffect(() => {
    setHelper(currentHelper);
    if (currentLinks.length) {
      setLinks(currentLinks);
    }
    if (helperState?.isEdit) {
      setHelperToEdit(helperState.id);
    }
  }, []);

  const handleLinks = async (helperId) => {
    return await Promise.all(
      links.map(async (it) => {
        const { id, order, ...link } = it;
        try {
          const exists = await getLinkById(id);
          if (exists) return await updateLink({ ...it, helperId });
          return await createLink({ ...link, helperId });
        } catch (err) {
          emitToastError(err);
        }
      })
    );
  };

  const handleSaveHelper = async () => {
    let newHelper;
    let createdLinks;
    try {
      newHelper = await (helperToEdit
        ? updateHelper(helper)
        : createHelper(helper));
      setHelper(newHelper);
    } catch (err) {
      emitToastError(err);
    }
    createdLinks = await handleLinks(newHelper.id);
    if (helperToEdit && deletedLinks.length) {
      await Promise.all(
        deletedLinks.map(async (it) => {
          try {
            return await deleteLink({ ...it, helperId: helperToEdit });
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
      setHelperToEdit(null);
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
  helperState: PropTypes.shape({
    isEdit: PropTypes.bool,
    id: PropTypes.number,
  }),
};

export default NewLinksPopup;
