import HomePageTemplate from '../../templates/HomePageTemplate/HomePageTemplate';
import GuideTemplate from '../../templates/GuideTemplate/GuideTemplate';
import BannerLeftContent from '../../components/BannerPageComponents/BannerLeftContent/BannerLeftContent';
import BannerLeftAppearance from '../../components/BannerPageComponents/BannerLeftAppearance/BannerLeftApperance';
import { React, useState, useEffect } from 'react';
import BannerPreview from '../../components/BannerPageComponents/BannerPreview/BannerPreview';
import { addBanner, getBannerById, editBanner } from '../../services/bannerServices';
import { useNavigate, useLocation } from 'react-router-dom';
import toastEmitter, { TOAST_EMITTER_KEY } from '../../utils/toastEmitter';

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

    const handleButtonClick = (index) => {
        setActiveButton(index);
    };

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
                    if (error.response && error.response.data) {
                        console.error('An error occurred:', error.response.data.errors[0].msg);
                    } else {
                        console.log('An error occurred. Please check your network connection and try again.');
                    }
                }
            };

            fetchBannerData();
        }
    }, [location.state?.isEdit, location.state?.id]);

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
            if (error.response && error.response.data) {
                console.error('An error occurred:', error.response.data.errors[0].msg);
            } else {
                console.log('An error occurred. Please check your network connection and try again.');
            }
        }
    }

    return (
        <div >
            <HomePageTemplate>
                <GuideTemplate title='New banner'
                    activeButton={activeButton}
                    handleButtonClick={handleButtonClick}
                    onSave={onSave}
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
                            setBackgroundColor={setBackgroundColor}
                            fontColor={fontColor}
                            setFontColor={setFontColor}
                        />
                    )} />
            </HomePageTemplate>
        </div>
    );
};

export default BannerPage;
