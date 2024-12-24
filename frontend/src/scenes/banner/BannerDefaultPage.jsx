import React, { useState } from 'react';
import DefaultPageTemplate from '../../templates/DefaultPageTemplate/DefaultPageTemplate';
import { getBanners, deleteBanner } from '../../services/bannerServices';
import { ACTIVITY_TYPES_INFO } from '../../data/guideMainPageData';
import BannerPage from './CreateBannerPage';

const BannerDefaultPage = () => {
    const [itemsUpdated, setItemsUpdated] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [itemId, setItemId] = useState(null);

    const getBannerDetails = (banner) => ({
        title: `Banner ${banner.id}`,
        text: banner.bannerText,
    });

    return (
        <>
            <DefaultPageTemplate
                getItems={getBanners}
                deleteItem={deleteBanner}
                setIsEdit={setIsEdit}
                setItemId={setItemId}
                itemType={ACTIVITY_TYPES_INFO.BANNERS}
                itemTypeInfo={ACTIVITY_TYPES_INFO.BANNERS}
                getItemDetails={getBannerDetails}
                itemsUpdated={itemsUpdated}
            />
            <BannerPage
                isEdit={isEdit}
                itemId={itemId}
                setItemsUpdated={setItemsUpdated}
                setIsEdit={setIsEdit}
            />
        </>
    );
};

export default BannerDefaultPage;
