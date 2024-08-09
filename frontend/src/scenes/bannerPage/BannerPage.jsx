import HomePageTemplate from '../../components/templates/HomePageTemplate';
import GuideTemplate from '../../components/templates/GuideTemplate/GuideTemplate';
import BannerLeftContent from '../../components/BannerPageComponents/BannerLeftContent/BannerLeftContent';
import BannerLeftAppearance from '../../components/BannerPageComponents/BannerLeftAppearance/BannerLeftApperance';
import { React, useState } from 'react';
import BannerPreview from '../../components/BannerPageComponents/BannerPreview/BannerPreview';

const BannerPage = () => {

    const [backgroundColor, setBackgroundColor] = useState("#");
    const [fontColor, setFontColor] = useState("#");
    const [activeButton, setActiveButton] = useState(0);
    const [isTopPosition, setIsTopPosition] = useState(true);
    const [bannerText, setBannerText] = useState('');
    const [url, setUrl] = useState('');

    const handleButtonClick = (index) => {
        setActiveButton(index);
    };

    return (
        <div >
            <HomePageTemplate>
                <GuideTemplate title='New banner'
                    activeButton={activeButton}
                    handleButtonClick={handleButtonClick}
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
