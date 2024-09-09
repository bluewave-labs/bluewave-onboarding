import React, { useState, useEffect } from 'react';
import List from '../../components/TourComponents/List/List';
import ContentArea from '../../components/TourComponents/ContentArea/ContentArea';
import ContentHeader from '../../components/TourComponents/ContentHeader/ContentHeader';
import ConfirmationPopup from '../../components/TourComponents/ConfirmationPopup/ConfirmationPopup';
import Button from '../../components/Button/Button';
import './ProductTourStyles.css';
import TourDescriptionText from '../../components/TourComponents/TourDescriptionText/TourDescriptionText';
import InfoTooltip from '../../components/TourComponents/InfoTooltip/InfoTooltip';

const TourPage = ({ items }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [showDemoItems, setShowDemoItems] = useState(false);

  useEffect(() => {
    setShowDemoItems(items.length === 0);
  }, [items]);

  const handleSelect = (idItem) => {
    setSelectedItem(idItem);
  };

  const handleDelete = () => {
    setPopupOpen(false);
  };

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleCreateItem = () => {
  };

  const demoItems = [
    {
      title: 'Main dashboard - first login tour',
      timestamp: '10:00 AM',
      idItem: '12548',
      text: 'This pops up the first time the user logins to the dashboard.',
      onDelete: () => { },
      onEdit: () => { }
    },
  ];
  const listItems = (showDemoItems ? demoItems : items).flatMap(item => Array(3).fill(item));

  return (
    <div className="product-page-container">
      <div className="product-page-header">
        <ContentHeader title={showDemoItems ? "Demo Tours" : "All Tours"} />
        <Button text="Create a new tour"/>
      </div>
      <div className="product-page">
        <ContentArea className="content-area">
          <List items={listItems} onSelectItem={handleSelect} />
        </ContentArea>
        <div className="tour-info-container">
          <h4>What is a product tour?</h4>
          <p>
            A product onboarding tour is a guided walkthrough or tutorial that introduces users to a new product or service.
            It typically occurs when a user first signs up or logs into the product.
            The purpose of the onboarding tour is to familiarize users with the key features, functionalities, and benefits of the product in order to enhance their understanding.
            During the onboarding tour, users are typically shown around the interface, given demonstrations of how to perform key tasks, and provided with explanations of important features.
          </p>
        </div>
      </div>
      {/* <TourDescriptionText description="A product onboarding tour is a guided walkthrough or tutorial..." />
      <InfoTooltip text="More info here" title="What is a product tour?" /> */}
      <ConfirmationPopup open={isPopupOpen} onConfirm={handleDelete} onCancel={handleClosePopup} />
    </div>
  );
};

export default TourPage;
