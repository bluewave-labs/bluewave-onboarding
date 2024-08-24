import React, { useState, useEffect } from 'react';
import CreateActivityButton from "../../components/Button/CreateActivityButton/CreateActivityButton";
import HomePageTemplate from "../../templates/HomePageTemplate/HomePageTemplate";
import { ACTIVITY_TYPES } from "../../data/CreateActivityButtonData";
import ParagraphCSS from "../../components/ParagraphCSS/ParagraphCSS";
import { useNavigate } from 'react-router-dom';
import GuideMainPageTemplate from "../../templates/GuideMainPageTemplate/GuideMainPageTemplate";
import { getBanners } from "../../services/bannerServices";
import { ACTIVITY_TYPES_INFO } from '../../data/GuideMainPageData';
import { deleteBanner } from '../../services/bannerServices';

const BannerDefaultPage = () => {
    const navigate = useNavigate();
    const [banners, setBanners] = useState([]);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [bannerToDelete, setBannerToDelete] = useState();
    const [bannerDeleted, setBannerDeleted] = useState(false);

    const handleDelete = async () => {
        await deleteBanner(bannerToDelete)
        setPopupOpen(false);
        setBannerDeleted(prevState => !prevState);
    };

    const handleOpenPopup = (id) => {
        setBannerToDelete(id)
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    const navigateToCreate = () => {navigate('/banner/create')}

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const bannerData = await getBanners();
                setBanners(bannerData);
            } catch (error) {
                console.error("Failed to fetch banners:", error);
            }
        };

        fetchBanners();
    }, [bannerDeleted]);

    const style = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    };

    const items = banners.map(banners => ({
        idItem: banners.id,
        title: `Banner ${banners.id}`,
        text: banners.bannerText,
        onDelete: () => handleOpenPopup(banners.id), 
        onEdit: () => navigate('/banner/create', {state:{isEdit:true, id: banners.id}}),
      }));

    return (
        <HomePageTemplate>
            {banners.length === 0 ? (
                <div style={style}>
                    <ParagraphCSS />
                    <CreateActivityButton type={ACTIVITY_TYPES.BANNERS} onClick={navigateToCreate} />
                </div>
            ) : (
                <GuideMainPageTemplate items={items}
                    handleDelete={handleDelete}
                    isPopupOpen={isPopupOpen}
                    handleClosePopup={handleClosePopup} 
                    type={ACTIVITY_TYPES_INFO.BANNERS}
                    onClick={navigateToCreate}/>
            )}
        </HomePageTemplate>
    );
}

export default BannerDefaultPage;
