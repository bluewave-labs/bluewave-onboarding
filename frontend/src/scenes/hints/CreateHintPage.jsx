import React, { useEffect, useState } from "react";
import GuideTemplate from "../../templates/GuideTemplate/GuideTemplate";
import RichTextEditor from "@components/RichTextEditor/RichTextEditor";
import HintLeftContent from "@components/HintPageComponents/HintLeftContent/HintLeftContent";
import HintLeftAppearance from "@components/HintPageComponents/HintLeftAppearance/HintLeftAppearance";
import { addHint, getHintById, editHint } from '../../services/hintServices';
import toastEmitter, { TOAST_EMITTER_KEY } from "../../utils/toastEmitter";
import { emitToastError } from "../../utils/guideHelper";
import { useNavigate, useLocation } from "react-router";

const HintPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeButton, setActiveButton] = useState(0);

  const handleButtonClick = (index) => {
    setActiveButton(index);
  };

  const [headerBackgroundColor, setHeaderBackgroundColor] = useState("#F8F9F8");
  const [headerColor, setHeaderColor] = useState("#101828");
  const [textColor, setTextColor] = useState("#344054");
  const [buttonBackgroundColor, setButtonBackgroundColor] = useState("#7F56D9");
  const [buttonTextColor, setButtonTextColor] = useState("#FFFFFF");

  const [header, setHeader] = useState('');
  const [content, setContent] = useState('');

  const [actionButtonUrl, setActionButtonUrl] = useState("https://");
  const [actionButtonText, setActionButtonText] = useState("");
  const [action, seAction] = useState('No action');
  const [targetElement, setTargetElement] = useState(".element");
  const [tooltipPlacement, setTooltipPlacement] = useState("Top");

  const stateList = [
    {
      stateName: "Header Background Color",
      state: headerBackgroundColor,
      setState: setHeaderBackgroundColor,
    },
    {
      stateName: "Header Color",
      state: headerColor,
      setState: setHeaderColor,
    },
    { stateName: "Text Color", state: textColor, setState: setTextColor },
    {
      stateName: "Button Background Color",
      state: buttonBackgroundColor,
      setState: setButtonBackgroundColor,
    },
    {
      stateName: "Button Text Color",
      state: buttonTextColor,
      setState: setButtonTextColor,
    },
  ];

  useEffect(() => {
    if (location.state?.isEdit) {
      const fetchHintData = async () => {
        try {
          const hintData = await getHintById(location.state?.id);
          setHeaderBackgroundColor(hintData.headerBackgroundColor || '#F8F9F8');
          setHeaderColor(hintData.headerColor || '#101828');
          setTextColor(hintData.textColor || '#344054');
          setButtonBackgroundColor(hintData.buttonBackgroundColor || '#7F56D9');
          setButtonTextColor(hintData.buttonTextColor || '#FFFFFF');
          setHeader(hintData.header || '');
          setContent(hintData.hintContent || '');
          setActionButtonUrl(hintData.actionButtonUrl || 'https://');
          setActionButtonText(hintData.actionButtonText || '');
          setButtonAction(hintData.action || 'No action');

        } catch (error) {
          emitToastError(error);
        }
      }
      fetchHintData();
    }
  }, [location.state])

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
      const response = location?.state?.isEdit
        ? await editHint(location?.state?.id, hintData)
        : await addHint(hintData);
      const toastMessage = location?.state?.isEdit ? "You edited this hint" : "New hint saved";
      toastEmitter.emit(TOAST_EMITTER_KEY, toastMessage);
      navigate("/hint");
    } catch (error) {
      const errorMessage = error.response?.data?.message
        ? `Error: ${error.response.data.message}`
        : 'An unexpected error occurred. Please try again.';
      toastEmitter.emit(TOAST_EMITTER_KEY, errorMessage);
    }
  };

  return (
    <GuideTemplate
      title={location.state?.isEdit ? "Edit Hint" : "Create Hint"}
      activeButton={activeButton}
      handleButtonClick={handleButtonClick}
      onSave={onSave}
      rightContent={() => (
        <RichTextEditor
          previewBtnText={actionButtonText}
          headerBackgroundColor={headerBackgroundColor}
          headerColor={headerColor}
          textColor={textColor}
          buttonBackgroundColor={buttonBackgroundColor}
          buttonTextColor={buttonTextColor}
          sx={{
            width: "100%",
            maxWidth: "700px",
            marginLeft: "2.5rem",
            marginTop: "1rem",
          }}
        />
      )}
      leftContent={() => (
        <HintLeftContent
          actionButtonText={actionButtonText}
          setActionButtonText={setActionButtonText}
          actionButtonUrl={actionButtonUrl}
          setActionButtonUrl={setActionButtonUrl}
          action={action}
          setAction={seAction}
          targetElement={targetElement}
          setTargetElement={setTargetElement}
          tooltipPlacement={tooltipPlacement}
          setTooltipPlacement={setTooltipPlacement}
        />
      )}
      leftAppearance={() => <HintLeftAppearance data={stateList} />}
    />
  );
};

export default HintPage;
