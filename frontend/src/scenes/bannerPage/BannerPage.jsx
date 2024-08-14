import HomePageTemplate from '../../templates/HomePageTemplate/HomePageTemplate';
import GuideTemplate from '../../templates/GuideTemplate/GuideTemplate';
import BannerLeftContent from '../../components/BannerPageComponents/BannerLeftContent/BannerLeftContent';
import BannerLeftAppearance from '../../components/BannerPageComponents/BannerLeftAppearance/BannerLeftApperance';
import { React, useState } from 'react';
import BannerPreview from '../../components/BannerPageComponents/BannerPreview/BannerPreview';
import { addBanner } from '../../services/bannerServices';
import { useNavigate } from 'react-router-dom';

const BannerPage = () => {
    const navigate = useNavigate();
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

    const onSave = async () => {
        const bannerData = { 
            backgroundColor:backgroundColor,
            fontColor:fontColor,
            url:url,
            position: isTopPosition ? 'top' : 'bottom',
            closeButtonAction:buttonAction.toLowerCase()
        };
        try {
          const response = await addBanner(bannerData);
          console.log('Add banner successful:', response);
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
                            url={url}
                            setUrl={setUrl}
                            setButtonAction={setButtonAction}
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
