import React, { useState } from 'react';
import DefaultPageTemplate from '../../templates/DefaultPageTemplate/DefaultPageTemplate';
import CreatePopupPage from './CreatePopupPage';
import { getPopups, deletePopup } from '../../services/popupServices';
import { ACTIVITY_TYPES_INFO } from '../../data/guideMainPageData';
import { useDialog } from "../../templates/GuideTemplate/GuideTemplateContext";

const PopupDefaultPage = () => {
    const [itemsUpdated, setItemsUpdated] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [itemId, setItemId] = useState(null);
    const { openDialog } = useDialog();
     
    const openEditPopupDialog = (id) => {
      setIsEdit(true);
      setItemId(id);
      openDialog();
    };

    const openNewPopupDialog = () => {
      setIsEdit(false);
      setItemId(null);
      openDialog();
    };

    const getPopupDetails = (popup) => ({
        title: `Popup ${popup.id}`,
        text: popup.header,
    });


    return (
      <>
        <DefaultPageTemplate
          getItems={getPopups}
          deleteItem={deletePopup}
          navigateToCreate={openNewPopupDialog}
          itemType={ACTIVITY_TYPES_INFO.POPUPS}
          itemTypeInfo={ACTIVITY_TYPES_INFO.POPUPS}
          getItemDetails={getPopupDetails}
          itemsUpdated={itemsUpdated}
          onEditItem={openEditPopupDialog}
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
