import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import HomePageTemplate from '../HomePageTemplate/HomePageTemplate';
import ParagraphCSS from '../../components/ParagraphCSS/ParagraphCSS';
import GuideMainPageTemplate from '../GuideMainPageTemplate/GuideMainPageTemplate';
import CreateActivityButton from '../../components/Button/CreateActivityButton/CreateActivityButton';

const DefaultPageTemplate = ({ getItems, deleteItem, navigateToCreate, itemType, itemTypeInfo, getItemDetails }) => {
    const [items, setItems] = useState([]);
    const [isPopupOpen, setPopupOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState();
    const [itemDeleted, setItemDeleted] = useState(false);

    const handleDelete = async () => {
        await deleteItem(itemToDelete);
        setPopupOpen(false);
        setItemDeleted(prevState => !prevState);
    };

    const handleOpenPopup = (id) => {
        setItemToDelete(id);
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setPopupOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getItems();
                setItems(data);
            } catch (error) {
                console.error(`Failed to fetch ${itemType.toLowerCase()}s:`, error);
            }
        };
        fetchData();
    }, [itemDeleted]);

    const style = {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    };

    const mappedItems = items.map(item => ({
        idItem: item.id,
        ...getItemDetails(item),
        onDelete: () => handleOpenPopup(item.id),
        onEdit: () => navigateToCreate({ state: { isEdit: true, id: item.id } }),
    }));

    return (
        <HomePageTemplate>
            {items.length === 0 ? (
                <div style={style}>
                    <ParagraphCSS />
                    <CreateActivityButton type={itemType} onClick={navigateToCreate} />
                </div>
            ) : (
                <GuideMainPageTemplate
                    items={mappedItems}
                    handleDelete={handleDelete}
                    isPopupOpen={isPopupOpen}
                    handleClosePopup={handleClosePopup}
                    type={itemTypeInfo}
                    onClick={navigateToCreate}
                />
            )}
        </HomePageTemplate>
    );
};

DefaultPageTemplate.propTypes = {
    getItems: PropTypes.func.isRequired, 
    deleteItem: PropTypes.func.isRequired, 
    navigateToCreate: PropTypes.func.isRequired, 
    itemType: PropTypes.string.isRequired, 
    itemTypeInfo: PropTypes.string.isRequired, 
    getItemDetails: PropTypes.func.isRequired, 
};

export default DefaultPageTemplate;
