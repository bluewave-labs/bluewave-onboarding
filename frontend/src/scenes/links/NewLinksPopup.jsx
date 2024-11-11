import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import Settings from "../../components/Links/Settings/Settings";
import Preview from "../../products/LinkPreview";
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
  const [isLoading, setIsLoading] = useState(false);

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

  const buildToastError = (msg) => ({
    response: { data: { errors: [{ msg }] } },
  });

  const handleLinks = async (item) => {
    const { target, id, ...link } = item;
    if (!link?.title.trim() || !link?.url.trim()) {
      emitToastError(buildToastError("Title and URL are required"));
      return null;
    }
    try {
      const exists = await getLinkById(id);
      if (exists?.id) return { ...link, target: target === "true", id };
      return { ...link, target: target === "true" };
    } catch (err) {
      emitToastError(err);
      return null;
    }
  };

  const handleSaveHelper = async () => {
    if (isLoading) return;
    setIsLoading(true);
    let newHelper;
    const formattedLinks = await Promise.all(links.map(handleLinks));
    try {
      if (formattedLinks.some((it) => !it)) {
        setIsLoading(false);
        return null;
      }
      newHelper = await (helperToEdit
        ? updateHelper(helper, formattedLinks)
        : createHelper(helper, formattedLinks));
      setHelper(newHelper);
    } catch (err) {
      emitToastError(err);
      setIsLoading(false);
      return null;
    }
    if (helperToEdit && deletedLinks.length) {
      await Promise.all(
        deletedLinks.map(async (it) => {
          try {
            return await deleteLink({ ...it, helperId: helperToEdit });
          } catch (err) {
            setIsLoading(false);
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
      setIsLoading(false);
    }
  };

  const rightContent = () => <Preview />;
  const leftContent = () => <LinkContent isLoading={isLoading} />;
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
