import HomePageTemplate from '../../components/templates/HomePageTemplate';
import GuideTemplate from '../../components/templates/GuideTemplate/GuideTemplate';
import { React, useState } from 'react';
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor';
import PopupAppearance from '../../components/PopupPageComponents/PopupAppearance/PopupAppearance';
import PopupContent from '../../components/PopupPageComponents/PopupContent/PopupContent';

const CreatePopupPage = () => {
    const [activeButton, setActiveButton] = useState(0);

    const [headerBackgroundColor, setHeaderBackgroundColor] = useState('#F8F9F8');
    const [headerColor, setHeaderColor] = useState('#101828');
    const [textColor, setTextColor] = useState('#344054');
    const [buttonBackgroundColor, setButtonBackgroundColor] = useState('#7F56D9');
    const [buttonTextColor, setButtonTextColor] = useState('#FFFFFF');

    const [header, setHeader] = useState('');
    const [content, setContent] = useState('');

    const [actionButtonUrl, setActionButtonUrl] = useState("https://");
    const [actionButtonText, setActionButtonText] = useState("Take me to subscription page");


    const stateList = [
        { stateName: 'Header Background Color', state: headerBackgroundColor, setState: setHeaderBackgroundColor },
        { stateName: 'Header Color', state: headerColor, setState: setHeaderColor },
        { stateName: 'Text Color', state: textColor, setState: setTextColor },
        { stateName: 'Button Background Color', state: buttonBackgroundColor, setState: setButtonBackgroundColor },
        { stateName: 'Button Text Color', state: buttonTextColor, setState: setButtonTextColor },
    ];


    const handleButtonClick = (index) => {
        setActiveButton(index);
    };

    return (
        <div >
            <HomePageTemplate>
                <GuideTemplate title='New Popup'
                    activeButton={activeButton}
                    handleButtonClick={handleButtonClick}
                    rightContent={() =>
                        <RichTextEditor
                            header={header}
                            content={content}
                            setHeader={setHeader}
                            setContent={setContent}
                            previewBtnText={actionButtonText}
                            headerBackgroundColor={headerBackgroundColor}
                            headerColor={headerColor}
                            textColor={textColor}
                            buttonBackgroundColor={buttonBackgroundColor}
                            buttonTextColor={buttonTextColor}
                            sx={{width: "100%", maxWidth: '700px' , marginLeft: '2.5rem', marginTop: '1rem'}}
                        />}
                    leftContent={() =>
                        <PopupContent
                            actionButtonUrl={actionButtonUrl}
                            setActionButtonText={setActionButtonText}
                            setActionButtonUrl={setActionButtonUrl}
                            actionButtonText={actionButtonText}

                        />}
                    leftAppearance={() => (
                        <PopupAppearance
                            data={stateList}
                        />
                    )} />

            </HomePageTemplate>
        </div>
    );
};

export default CreatePopupPage;
