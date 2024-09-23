import GuideTemplate from '../../templates/GuideTemplate/GuideTemplate';
import { React, useState, useEffect } from 'react';
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor';
import PopupAppearance from '../../components/PopupPageComponents/PopupAppearance/PopupAppearance';
import PopupContent from '../../components/PopupPageComponents/PopupContent/PopupContent';
import { addPopup, getPopupById, editPopup } from '../../services/popupServices';
import { useNavigate, useLocation } from 'react-router-dom';
import toastEmitter, { TOAST_EMITTER_KEY } from '../../utils/toastEmitter';


const CreatePopupPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

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
    const [buttonAction, setButtonAction] = useState('No action');
    const [popupSize, setPopupSize] = useState('Small');


    const stateList = [
        { stateName: 'Header Background Color', state: headerBackgroundColor, setState: setHeaderBackgroundColor },
        { stateName: 'Header Color', state: headerColor, setState: setHeaderColor },
        { stateName: 'Text Color', state: textColor, setState: setTextColor },
        { stateName: 'Button Background Color', state: buttonBackgroundColor, setState: setButtonBackgroundColor },
        { stateName: 'Button Text Color', state: buttonTextColor, setState: setButtonTextColor },
    ];

    useEffect(() => {
        if (location.state?.isEdit) {
            const fetchPopupData = async () => {
                try {
                    const popupData = await getPopupById(location.state.id);

                    // Update the state with the fetched data
                    setHeaderBackgroundColor(popupData.headerBackgroundColor || '#F8F9F8');
                    setHeaderColor(popupData.headerColor || '#101828');
                    setTextColor(popupData.textColor || '#344054');
                    setButtonBackgroundColor(popupData.buttonBackgroundColor || '#7F56D9');
                    setButtonTextColor(popupData.buttonTextColor || '#FFFFFF');
                    setHeader(popupData.header || '');
                    setContent(popupData.content || '');
                    setActionButtonUrl(popupData.url || 'https://');
                    setActionButtonText(popupData.actionButtonText || 'Take me to subscription page');
                    setButtonAction(popupData.closeButtonAction || 'No action');
                    setPopupSize(popupData.popupSize || 'Small');

                    console.log('Get popup successful:', popupData);
                } catch (error) {
                    if (error.response && error.response.data) {
                        toastEmitter.emit(TOAST_EMITTER_KEY, 'An error occurred: ' + error.response.data.errors[0].msg)
                    } else {
                        toastEmitter.emit(TOAST_EMITTER_KEY, 'An error occurred. Please check your network connection and try again.')
                    }
                }
            };

            fetchPopupData();
        }
    }, []);

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
            content: content
        };
        try {
            const response = location.state?.isEdit
                ? await editPopup(location.state?.id, popupData)
                : await addPopup(popupData);

            const toastMessage = location.state?.isEdit ? 'You edited this popup' : 'New popup Saved'

            toastEmitter.emit(TOAST_EMITTER_KEY, toastMessage)
            navigate('/popup');
        } catch (error) {
            if (error.response && error.response.data) {
                toastEmitter.emit(TOAST_EMITTER_KEY, 'An error occurred: ' + error.response.data.errors[0].msg)
            } else {
                toastEmitter.emit(TOAST_EMITTER_KEY, 'An error occurred. Please check your network connection and try again.')
            }
        }
    }


    const handleButtonClick = (index) => {
        setActiveButton(index);
    };

    return (
        <GuideTemplate title='New Popup'
            activeButton={activeButton}
            handleButtonClick={handleButtonClick}
            onSave={onSave}
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
                    sx={{ width: "100%", maxWidth: '700px', marginLeft: '2.5rem', marginTop: '1rem' }}
                />}
            leftContent={() =>
                <PopupContent
                    actionButtonUrl={actionButtonUrl}
                    setActionButtonText={setActionButtonText}
                    setActionButtonUrl={setActionButtonUrl}
                    actionButtonText={actionButtonText}
                    setButtonAction={setButtonAction}
                    buttonAction={buttonAction}
                />}
            leftAppearance={() => (
                <PopupAppearance
                    data={stateList}
                    setPopupSize={setPopupSize}
                />
            )} />
    );
};

export default CreatePopupPage;
