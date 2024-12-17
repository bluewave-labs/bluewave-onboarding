import React, { useState, useEffect, useMemo, useCallback } from "react";
import Turndown from "turndown";
import GuideTemplate from "../../templates/GuideTemplate/GuideTemplate";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
import PopupComponent from "../../products/Popup/PopupComponent";
import PopupAppearance from "./PopupPageComponents/PopupAppearance/PopupAppearance";
import PopupContent from "./PopupPageComponents/PopupContent/PopupContent";
import {
  addPopup,
  getPopupById,
  editPopup,
} from "../../services/popupServices";
import toastEmitter, { TOAST_EMITTER_KEY } from "../../utils/toastEmitter";
import { emitToastError } from "../../utils/guideHelper";
import { useDialog } from "../../templates/GuideTemplate/GuideTemplateContext";
import { useLocation } from "react-router";

const CreatePopupPage = ({
  autoOpen = false,
  isEdit,
  setIsEdit,
  itemId,
  setItemsUpdated,
}) => {
  const [popupStates, setPopupStates] = useState({
    header: "",
    content: "",
    activeButton: 0,
    headerBackgroundColor: "#F8F9F8",
    headerColor: "#101828",
    textColor: "#344054",
    buttonBackgroundColor: "#7F56D9",
    buttonTextColor: "#FFFFFF",
    actionButtonUrl: "https://",
    actionButtonText: "Take me to subscription page",
    buttonAction: "No action",
    popupSize: "Small",
  });

  const { openDialog, closeDialog, isOpen } = useDialog();
  const location = useLocation();

  useEffect(() => {
    if (autoOpen) {
      // auto open dialog to run tests
      openDialog();
    }
  }, [autoOpen, openDialog]);

  const {
    header,
    content,
    activeButton,
    headerBackgroundColor,
    headerColor,
    textColor,
    buttonBackgroundColor,
    buttonTextColor,
    actionButtonUrl,
    actionButtonText,
    buttonAction,
    popupSize,
  } = popupStates;

  const updatePopupStates = (key, value) => {
    setPopupStates((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const markdownContent = useMemo(() => {
    const turndown = new Turndown();
    return turndown.turndown(content);
  }, [content]);

  const stateList = [
    {
      stateName: "Header Background Color",
      state: headerBackgroundColor,
      setState: (value) => updatePopupStates("headerBackgroundColor", value),
    },
    {
      stateName: "Header Color",
      state: headerColor,
      setState: (value) => updatePopupStates("headerColor", value),
    },
    {
      stateName: "Text Color",
      state: textColor,
      setState: (value) => updatePopupStates("textColor", value),
    },
    {
      stateName: "Button Background Color",
      state: buttonBackgroundColor,
      setState: (value) => updatePopupStates("buttonBackgroundColor", value),
    },
    {
      stateName: "Button Text Color",
      state: buttonTextColor,
      setState: (value) => updatePopupStates("buttonTextColor", value),
    },
  ];

  useEffect(() => {
    if (isEdit) {
      const fetchPopupData = async () => {
        try {
          const popupData = await getPopupById(itemId);
          const updatedStates = {
            header: popupData.header || "",
            content: popupData.content || "",
            headerBackgroundColor: popupData.headerBackgroundColor || "#F8F9F8",
            headerColor: popupData.headerColor || "#101828",
            textColor: popupData.textColor || "#344054",
            buttonBackgroundColor: popupData.buttonBackgroundColor || "#7F56D9",
            buttonTextColor: popupData.buttonTextColor || "#FFFFFF",
            header: popupData.header || "",
            content: popupData.content || "",
            actionButtonUrl: popupData.url || "https://",
            actionButtonText:
              popupData.actionButtonText || "Take me to subscription page",
            buttonAction: popupData.closeButtonAction || "No action",
            popupSize: popupData.popupSize || "Small",
          };
          setPopupStates((prevState) => ({
            ...prevState,
            ...updatedStates,
          }));
        } catch (error) {
          emitToastError(error);
        }
      };

      fetchPopupData();
    }
  }, [isEdit, itemId]);

  const onSave = async () => {
    const popupData = {
      popupSize: popupSize.toLowerCase(),
      url: actionButtonUrl,
      actionButtonText: actionButtonText,
      headerBackgroundColor: headerBackgroundColor,
      headerColor: headerColor,
      textColor: textColor,
      buttonBackgroundColor: buttonBackgroundColor,
      buttonTextColor: buttonTextColor,
      closeButtonAction: buttonAction.toLowerCase(),
      header: header,
      content: content,
    };
    try {
      const response = isEdit
        ? await editPopup(itemId, popupData)
        : await addPopup(popupData);

      const toastMessage = isEdit ? "You edited this popup" : "New popup Saved";

      toastEmitter.emit(TOAST_EMITTER_KEY, toastMessage);
      setItemsUpdated((prevState) => !prevState);
      closeDialog();
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? `Error: ${error.response.data.message}`
        : "An unexpected error occurred. Please try again.";
      toastEmitter.emit(TOAST_EMITTER_KEY, errorMessage);
    }
  };

  const handleButtonClick = (index) => {
    updatePopupStates("activeButton", index);
  };

// reset states when dialog is closed
  useEffect(() => {
    if (!isOpen && location.pathname === "/popup") {
      setPopupStates({
        header: "",
        content: "",
        activeButton: 0,
        headerBackgroundColor: "#F8F9F8",
        headerColor: "#101828",
        textColor: "#344054",
        buttonBackgroundColor: "#7F56D9",
        buttonTextColor: "#FFFFFF",
        actionButtonUrl: "https://",
        actionButtonText: "Take me to subscription page",
        buttonAction: "No action",
        popupSize: "Small",
      });
      setIsEdit(false);
    }
  }, [isOpen, location.pathname]);

  return (
    <GuideTemplate
      title={isEdit ? "Edit Popup" : "New Popup"}
      activeButton={activeButton}
      handleButtonClick={handleButtonClick}
      onSave={onSave}
      rightContent={() => (
        <RichTextEditor
          previewComponent={() => (
            <PopupComponent
              header={header}
              content={markdownContent}
              previewBtnText={actionButtonText}
              headerBackgroundColor={headerBackgroundColor}
              headerColor={headerColor}
              textColor={textColor}
              buttonBackgroundColor={buttonBackgroundColor}
              buttonTextColor={buttonTextColor}
              popupSize={popupSize}
            />
          )}
          sx={{
            minWidth: "400px",
            maxWidth: "700px",
            marginLeft: "2.5rem",
            marginTop: "1rem",
          }}
          header={header}
          setHeader={(value) => updatePopupStates("header", value)}
          content={content}
          setContent={(value) => updatePopupStates("content", value)}
        />
      )}
      leftContent={() => (
        <PopupContent
          actionButtonUrl={actionButtonUrl}
          actionButtonText={actionButtonText}
          buttonAction={buttonAction}
          updatePopupStates={updatePopupStates}
        />
      )}
      leftAppearance={() => (
        <PopupAppearance
          data={stateList}
          updatePopupStates={updatePopupStates}
          popupSize={popupSize}
        />
      )}
    />
  );
};

export default CreatePopupPage;
