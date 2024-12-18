import React, { useState } from 'react';
import DefaultPageTemplate from '../../templates/DefaultPageTemplate/DefaultPageTemplate';
import CreatePopupPage from './CreatePopupPage';
import { getPopups, deletePopup } from '../../services/popupServices';
import { ACTIVITY_TYPES_INFO } from '../../data/guideMainPageData';

const PopupDefaultPage = () => {
    const [itemsUpdated, setItemsUpdated] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [itemId, setItemId] = useState(null);

    const getPopupDetails = (popup) => ({
        title: `Popup ${popup.id}`,
        text: popup.header,
    });


    return (
      <>
        <DefaultPageTemplate
          getItems={getPopups}
          deleteItem={deletePopup}
          setIsEdit={setIsEdit}
          setItemId={setItemId}
          itemType={ACTIVITY_TYPES_INFO.POPUPS}
          itemTypeInfo={ACTIVITY_TYPES_INFO.POPUPS}
          getItemDetails={getPopupDetails}
          itemsUpdated={itemsUpdated}
        />
        <CreatePopupPage
          isEdit={isEdit}
          itemId={itemId}
          setItemsUpdated={setItemsUpdated}
        />
      </>
    );
};

export default PopupDefaultPage;
