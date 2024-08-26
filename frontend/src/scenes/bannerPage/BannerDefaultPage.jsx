import React from 'react';
import DefaultPageTemplate from '../../templates/DefaultPageTemplate/DefaultPageTemplate';
import { getBanners, deleteBanner } from '../../services/bannerServices';
import { useNavigate } from 'react-router-dom';
import { ACTIVITY_TYPES_INFO } from '../../data/GuideMainPageData';

const BannerDefaultPage = () => {
    const navigate = useNavigate();

    const getBannerDetails = (banner) => ({
        title: `Banner ${banner.id}`,
        text: banner.bannerText,
    });

    const navigateToCreate = (state) => {
        navigate('/banner/create', state);
    };

    return (
        <DefaultPageTemplate
            fetchItems={getBanners}
            deleteItem={deleteBanner}
            navigateToCreate={navigateToCreate}
            itemType={ACTIVITY_TYPES_INFO.BANNERS}
            itemTypeInfo={ACTIVITY_TYPES_INFO.BANNERS}
            getItemDetails={getBannerDetails}
        />
    );
};

export default BannerDefaultPage;
