import React, { useState } from "react";
import GuideTemplate from "../../templates/GuideTemplate/GuideTemplate";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
import HintLeftContent from "../../components/HintPageComponents/HintLeftContent/HintLeftContent";
import HintLeftAppearance from "../../components/HintPageComponents/HintLeftAppearance/HintLeftAppearance";
import HintComponent from "../../products/Hint/HintComponent";

const HintPage = () => {
  const [activeButton, setActiveButton] = useState(0);
  const [leftContentFormData, setLeftContentFormData] = useState({
    actionButtonUrl: "https//",
    actionButtonText: "",
    targetElement: ".element",
  });

  const handleButtonClick = (index) => {
    setActiveButton(index);
  };

  const [headerBackgroundColor, setHeaderBackgroundColor] = useState("#FFFFFF");
  const [headerColor, setHeaderColor] = useState("#101828");
  const [textColor, setTextColor] = useState("#344054");
  const [buttonBackgroundColor, setButtonBackgroundColor] = useState("#7F56D9");
  const [buttonTextColor, setButtonTextColor] = useState("#FFFFFF");

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

  return (
    <GuideTemplate
      title="New Hint"
      contentType="hint"
      activeButton={activeButton}
      handleButtonClick={handleButtonClick}
      rightContent={() => (
        <RichTextEditor
          sx={{
            width: "100%",
            maxWidth: "700px",
            marginLeft: "2.5rem",
            marginTop: "1rem",
          }}
          previewComponent={({ header, content }) => {
            return (
              <HintComponent
                header={header}
                content={content}
                previewBtnText={leftContentFormData.actionButtonText}
                headerBackgroundColor={headerBackgroundColor}
                headerColor={headerColor}
                textColor={textColor}
                buttonBackgroundColor={buttonBackgroundColor}
                buttonTextColor={buttonTextColor}
              />
            );
          }}
        />
      )}
      leftContent={() => (
        <HintLeftContent
          formData={leftContentFormData}
          setLeftContentFormData={setLeftContentFormData}
        />
      )}
      leftAppearance={() => <HintLeftAppearance data={stateList} />}
    />
  );
};

export default HintPage;
