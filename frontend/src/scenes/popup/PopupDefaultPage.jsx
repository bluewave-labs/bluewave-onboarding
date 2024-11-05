import React from 'react';
import DefaultPageTemplate from '../../templates/DefaultPageTemplate/DefaultPageTemplate';
import CreatePopupPage from './CreatePopupPage';
import { getPopups, deletePopup } from '../../services/popupServices';
import { ACTIVITY_TYPES_INFO } from '../../data/guideMainPageData';
import { useDialog } from "../../templates/GuideTemplate/GuideTemplateContext";

const PopupDefaultPage = () => {
    const { openDialog } = useDialog();

    const getPopupDetails = (popup) => ({
        title: `Popup ${popup.id}`,
        text: popup.header,
    });

    return (
        <>
            <DefaultPageTemplate
                getItems={getPopups}
                deleteItem={deletePopup}
                navigateToCreate={openDialog}
                itemType={ACTIVITY_TYPES_INFO.POPUPS}
                itemTypeInfo={ACTIVITY_TYPES_INFO.POPUPS}
                getItemDetails={getPopupDetails}
            />
            <CreatePopupPage />
        </>
        
    );
};

export default PopupDefaultPage;
