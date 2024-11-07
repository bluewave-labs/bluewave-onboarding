import { React, useState, useEffect } from 'react';
import GuideTemplate from '../../templates/GuideTemplate/GuideTemplate';
import BannerLeftContent from './BannerPageComponents/BannerLeftContent/BannerLeftContent';
import BannerLeftAppearance from './BannerPageComponents/BannerLeftAppearance/BannerLeftApperance';
import BannerPreview from './BannerPageComponents/BannerPreview/BannerPreview';
import { addBanner, getBannerById, editBanner } from '../../services/bannerServices';
import { useNavigate, useLocation } from 'react-router-dom';
import toastEmitter, { TOAST_EMITTER_KEY } from '../../utils/toastEmitter';
import {emitToastError} from '../../utils/guideHelper'

const BannerPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [backgroundColor, setBackgroundColor] = useState("#F9F5FF");
    const [fontColor, setFontColor] = useState("#344054");
    const [activeButton, setActiveButton] = useState(0);
    const [isTopPosition, setIsTopPosition] = useState(true);
    const [bannerText, setBannerText] = useState('');
    const [url, setUrl] = useState('');
    const [buttonAction, setButtonAction] = useState('No action');
    const [isBackgroundColorValid, setIsBackgroundColorValid] = useState(true);
    const [isFontColorValid, setIsFontColorValid] = useState(true);
    const [isBackgroundColorTouched, setIsBackgroundColorTouched] = useState(false);
    const [isFontColorTouched, setIsFontColorTouched] = useState(false);

    const handleButtonClick = (index) => {
        setActiveButton(index);
    };

    const validateHexColor = (color) => /^#[0-9A-F]{6}$/i.test(color);

    const handleBackgroundColorChange = (color) => {
        setBackgroundColor(color);
        setIsBackgroundColorValid(validateHexColor(color));
        setIsBackgroundColorTouched(true);
    };

    const handleFontColorChange = (color) => {
        setFontColor(color);
        setIsFontColorValid(validateHexColor(color));
        setIsFontColorTouched(true);
    };

    const isSaveDisabled = !isBackgroundColorValid || !isFontColorValid;

    useEffect(() => {
        if (location.state?.isEdit) {
            const fetchBannerData = async () => {
                try {
                    const bannerData = await getBannerById(location.state.id);

                    // Update the state with the fetched data
                    setBackgroundColor(bannerData.backgroundColor || '#F9F5FF');
                    setFontColor(bannerData.fontColor || '#344054');
                    setBannerText(bannerData.bannerText || '');
                    setUrl(bannerData.url || '');
                    setButtonAction(bannerData.closeButtonAction || 'No action');
                    setIsTopPosition(bannerData.position === 'top');

                    console.log('Get banner successful:', bannerData);
                } catch (error) {
                    emitToastError(error)
                }
            };

            fetchBannerData();
        }
    }, [location.state]);

    const onSave = async () => {
        const bannerData = {
            backgroundColor: backgroundColor,
            fontColor: fontColor,
            url: url,
            position: isTopPosition ? 'top' : 'bottom',
            closeButtonAction: buttonAction.toLowerCase(),
            bannerText: bannerText
        };
        try {
            const response = location.state?.isEdit
                ? await editBanner(location.state?.id, bannerData)
                : await addBanner(bannerData);
            const toastMessage = location.state?.isEdit ? 'You edited this banner' : 'New banner saved'
            toastEmitter.emit(TOAST_EMITTER_KEY, toastMessage);
            navigate('/banner');
        } catch (error) {
            emitToastError(error)
        }
    }

    return (

        <GuideTemplate title={location.state?.isEdit ? 'Edit Banner' : 'New Banner'}
            activeButton={activeButton}
            handleButtonClick={handleButtonClick}
            onSave={onSave}
            isSaveDisabled={isSaveDisabled}
            rightContent={() =>
                <BannerPreview
                    backgroundColor={backgroundColor}
                    color={fontColor}
                    isTopPosition={isTopPosition}
                    bannerText={bannerText}
                    setBannerText={setBannerText}
                />}
            leftContent={() =>
                <BannerLeftContent
                    setIsTopPosition={setIsTopPosition}
                    isTopPosition={isTopPosition}
                    url={url}
                    setUrl={setUrl}
                    setButtonAction={setButtonAction}
                    buttonAction={buttonAction}
                />}
            leftAppearance={() => (
                <BannerLeftAppearance
                    backgroundColor={backgroundColor}
                    setBackgroundColor={handleBackgroundColorChange}
                    fontColor={fontColor}
                    setFontColor={handleFontColorChange}
                    isBackgroundColorValid={isBackgroundColorValid}
                    isFontColorValid={isFontColorValid}
                    isBackgroundColorTouched={isBackgroundColorTouched}
                    isFontColorTouched={isFontColorTouched}
                />
            )} />
    );
};

export default BannerPage;
