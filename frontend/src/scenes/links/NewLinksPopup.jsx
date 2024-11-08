import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import Preview from "../../products/LinkPreview";
import Settings from "../../components/Links/Settings/Settings";
import { createHelper, updateHelper } from "../../services/helperLinkService";
import { deleteLink, getLinkById } from "../../services/linkService";
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
    if (currentLinks?.length) {
      setLinks(currentLinks);
    }
    if (helperState?.isEdit) {
      setHelperToEdit(helperState.id);
    }
  }, []);

  const handleLinks = async (item) => {
    const { target, id, ...link } = item;
    const exists = await getLinkById(id);
    if (exists) return { ...link, target: Boolean(target), id };
    return { ...link, target: Boolean(target) };
  };

  const handleSaveHelper = async () => {
    let newHelper;
    const formattedLinks = await Promise.all(links.map(handleLinks));
    try {
      newHelper = await (helperToEdit
        ? updateHelper(helper, formattedLinks)
        : createHelper(helper, formattedLinks));
      setHelper(newHelper);
    } catch (err) {
      emitToastError(err);
      return null;
    }
    // createdLinks = await handleLinks(newHelper.id);
    if (helperToEdit && deletedLinks.length) {
      await Promise.all(
        deletedLinks.map(async (it) => {
          try {
            return await deleteLink({ ...it, helperId: helperToEdit });
          } catch (err) {
            emitToastError(err);
            return null;
          }
        })
      );
    }
    if (newHelper) {
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
      target: PropTypes.bool,
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
