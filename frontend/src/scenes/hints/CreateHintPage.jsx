import React, { useEffect, useState, useMemo } from "react";
import Turndown from "turndown";
import GuideTemplate from "../../templates/GuideTemplate/GuideTemplate";
import RichTextEditor from "@components/RichTextEditor/RichTextEditor";
import HintComponent from "../../products/Hint/HintComponent";
import HintLeftContent from "@components/HintPageComponents/HintLeftContent/HintLeftContent";
import HintLeftAppearance from "@components/HintPageComponents/HintLeftAppearance/HintLeftAppearance";
import { addHint, getHintById, editHint } from '../../services/hintServices';
import toastEmitter, { TOAST_EMITTER_KEY } from "../../utils/toastEmitter";
import { emitToastError } from "../../utils/guideHelper";
import { useLocation } from "react-router";
import { useDialog } from "../../templates/GuideTemplate/GuideTemplateContext";

const HintPage = ({ isEdit, setIsEdit, itemId, setItemsUpdated }) => {
  const [hintStates, setHintStates] = useState({
    headerBackgroundColor: "#FFFFFF",
    headerColor: "#101828",
    textColor: "#344054",
    buttonBackgroundColor: "#7F56D9",
    buttonTextColor: "#FFFFFF",
    header: "",
    content: "",
    actionButtonUrl: "https://",
    actionButtonText: "Take me to subscription page",
    action: "No action",
    targetElement: ".element",
    tooltipPlacement: "Top",
    activeButton: 0,
  });
  const {
    headerBackgroundColor,
    headerColor,
    textColor,
    buttonBackgroundColor,
    buttonTextColor,
    header,
    content,
    actionButtonUrl,
    actionButtonText,
    action,
    targetElement,
    tooltipPlacement,
    activeButton,
  } = hintStates;

  const { closeDialog, isOpen } = useDialog();
  const location = useLocation();

  const updateHintStates = (key, value) => {
    setHintStates((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const markdownContent = useMemo(() => {
    const turndown = new Turndown();
    return turndown.turndown(content);
  }, [content]);

  const handleButtonClick = (index) => {
    updateHintStates("activeButton", index);
  };

  const stateList = [
    {
      stateName: "Header Background Color",
      state: headerBackgroundColor,
      setState: (value) => updateHintStates("headerBackgroundColor", value),
    },
    {
      stateName: "Header Color",
      state: headerColor,
      setState: (value) => updateHintStates("headerColor", value),
    },
    {
      stateName: "Text Color",
      state: textColor,
      setState: (value) => updateHintStates("textColor", value),
    },
    {
      stateName: "Button Background Color",
      state: buttonBackgroundColor,
      setState: (value) => updateHintStates("buttonBackgroundColor", value),
    },
    {
      stateName: "Button Text Color",
      state: buttonTextColor,
      setState: (value) => updateHintStates("buttonTextColor", value),
    },
  ];

  useEffect(() => {
    if (isEdit) {
      const fetchHintData = async () => {
        try {
          const hintData = await getHintById(itemId);
          const updatedStates = {
            headerBackgroundColor: hintData.headerBackgroundColor || "#F8F9F8",
            headerColor: hintData.headerColor || "#101828",
            textColor: hintData.textColor || "#344054",
            buttonBackgroundColor: hintData.buttonBackgroundColor || "#7F56D9",
            buttonTextColor: hintData.buttonTextColor || "#FFFFFF",
            header: hintData.header || "",
            content: hintData.hintContent || "",
            actionButtonUrl: hintData.actionButtonUrl || "https://",
            actionButtonText: hintData.actionButtonText || "",
            action: hintData.action || "No action",
            targetElement: hintData.targetElement || "",
            tooltipPlacement: hintData.tooltipPlacement || "Top",
          };
          setHintStates((prevState) => ({
            ...prevState,
            ...updatedStates,
          }));
        } catch (error) {
          emitToastError(error);
        }
      };
      fetchHintData();
    }
  }, [isEdit, itemId]);

  const onSave = async () => {
    const hintData = {
      tooltipPlacement: tooltipPlacement.toLowerCase(),
      actionButtonUrl,
      actionButtonText,
      action: action.toLowerCase(),
      targetElement,
      header,
      hintContent: content,
      headerBackgroundColor,
      headerColor,
      textColor,
      buttonBackgroundColor,
      buttonTextColor,
    };
    try {
      const response = isEdit
        ? await editHint(itemId, hintData)
        : await addHint(hintData);
      const toastMessage = isEdit ? "You edited this hint" : "New hint saved";
      toastEmitter.emit(TOAST_EMITTER_KEY, toastMessage);
      setItemsUpdated((prev) => !prev);
      closeDialog();
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? `Error: ${error.response.data.message}`
        : "An unexpected error occurred. Please try again.";
      toastEmitter.emit(TOAST_EMITTER_KEY, errorMessage);
    }
  };

  // reset states when dialog is closed
  useEffect(() => {
    if (!isOpen && location.pathname === "/hint") {
      setHintStates({
        headerBackgroundColor: "#FFFFFF",
        headerColor: "#101828",
        textColor: "#344054",
        buttonBackgroundColor: "#7F56D9",
        buttonTextColor: "#FFFFFF",
        header: "",
        content: "",
        actionButtonUrl: "https://",
        actionButtonText: "Take me to subscription page",
        action: "No action",
        targetElement: ".element",
        tooltipPlacement: "Top",
        activeButton: 0,
      });
      setIsEdit(false);
    }
  }, [isOpen, location.pathname]);

  return (
    <GuideTemplate
      title={isEdit ? "Edit Hint" : "Create Hint"}
      activeButton={activeButton}
      handleButtonClick={handleButtonClick}
      onSave={onSave}
      rightContent={() => (
        <RichTextEditor
          sx={{
            width: "400px",
            maxWidth: "700px",
            marginLeft: "2.5rem",
            marginTop: "1rem",
          }}
          header={header}
          setHeader={(value) => updateHintStates("header", value)}
          setContent={(value) => updateHintStates("content", value)}
          content={content}
          previewComponent={() => (
            <HintComponent
              header={header}
              content={markdownContent}
              previewBtnText={actionButtonText}
              headerBackgroundColor={headerBackgroundColor}
              headerColor={headerColor}
              textColor={textColor}
              buttonBackgroundColor={buttonBackgroundColor}
              buttonTextColor={buttonTextColor}
            />
          )}
        />
      )}
      leftContent={() => (
        <HintLeftContent
          actionButtonText={actionButtonText}
          actionButtonUrl={actionButtonUrl}
          action={action}
          targetElement={targetElement}
          tooltipPlacement={tooltipPlacement}
          updateHintStates={updateHintStates}
        />
      )}
      leftAppearance={() => <HintLeftAppearance data={stateList} />}
    />
  );
};

export default HintPage;
