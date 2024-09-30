import React from 'react';
import DefaultPageTemplate from '../../templates/DefaultPageTemplate/DefaultPageTemplate';
import { getPopups, deletePopup } from '../../services/popupServices';
import { useNavigate } from 'react-router-dom';
import { ACTIVITY_TYPES_INFO } from '../../data/GuideMainPageData';

const PopupDefaultPage = () => {
    const navigate = useNavigate();

    const getPopupDetails = (popup) => ({
        title: `Popup ${popup.id}`,
        text: popup.header,
    });

    const navigateToCreate = (state) => {
        navigate('/popup/create', state);
    };

    return (
        <DefaultPageTemplate
            getItems={getPopups}
            deleteItem={deletePopup}
            navigateToCreate={navigateToCreate}
            itemType={ACTIVITY_TYPES_INFO.POPUPS}
            itemTypeInfo={ACTIVITY_TYPES_INFO.POPUPS}
            getItemDetails={getPopupDetails}
        />
    );
};

export default PopupDefaultPage;
