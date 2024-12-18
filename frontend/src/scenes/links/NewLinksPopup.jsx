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
import LinkAppearance from "./LinkPageComponents/LinkAppearance";
import LinkContent from "./LinkPageComponents/LinkContent";
import { useDialog } from "../../templates/GuideTemplate/GuideTemplateContext";
import s from "./LinkPage.module.scss";
import { getHelperById } from "../../services/helperLinkService";

const NewLinksPopup = ({
  autoOpen = false,
  isEdit,
  setIsEdit,
  itemId,
  setItemsUpdated
}) => {
  const [activeBtn, setActiveBtn] = useState(0);
  const [currentHelper, setCurrentHelper] = useState({});
  const [currentLinks, setCurrentLinks] = useState([]);

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

  const { openDialog, closeDialog, isOpen } = useDialog();
  const fetchHelperData = async () => {
    const { links, ...data } = await getHelperById(id);
    setCurrentHelper(data);
    setCurrentLinks(links.sort((a, b) => a.order - b.order));
    setHelperToEdit(itemId);
  }

  useEffect(() => {
    if (autoOpen) {
      openDialog();
    }
  }, [autoOpen, openDialog]);

  useEffect(() => {
    handleLinks
    setHelper(currentHelper);
    if (currentLinks?.length) {
      setLinks(currentLinks);
    }
    if (isEdit) {
      fetchHelperData()
    }
    else {
      setCurrentHelper({
        title: "",
        headerBackgroundColor: "#F8F9F8",
        linkFontColor: "#344054",
        iconColor: "#7F56D9",
      });
      setCurrentLinks([]);
    }
    if (!isOpen) {
      setLinks([]);
      setHelper({});
      setHelperToEdit(null);
    }
  }, [openDialog, isOpen]);

  const buildToastError = (msg) =>
    msg.response
      ? msg
      : {
        response: { data: { errors: [{ msg }] } },
      };

  const handleLinks = async (item) => {
    const { id, ...link } = item;
    if (!link?.title.trim() || !link?.url.trim()) {
      emitToastError(buildToastError("Title and URL are required"));
      return null;
    }
    try {
      const exists = await getLinkById(id);
      if (exists?.id) return { ...link, id };
      return { ...link };
    } catch (err) {
      emitToastError(err);
      return null;
    }
  };

  const handleSaveHelper = async () => {
    let newHelper;
    const formattedLinks = await Promise.all(links.map(handleLinks));
    try {
      if (formattedLinks.some((it) => !it)) {
        return null;
      }
      newHelper = await (helperToEdit
        ? updateHelper(helper, formattedLinks)
        : createHelper(helper, formattedLinks));
      setHelper(newHelper);
      setItemsUpdated((prevState) => !prevState);
      closeDialog();
    } catch (err) {
      emitToastError(buildToastError(err));
      return null;
    }
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
        title={isEdit ? "Edit Helper Link" : "New Helper Link"}
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