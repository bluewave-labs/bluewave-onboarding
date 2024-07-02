import React, { useState } from 'react';
import TourList from '../../components/TourList/TourList';
import ContentArea from '../../components/ContentArea/ContentArea';
import ContentHeader from '../../components/ContentHeader/ContentHeader';
import TourDescriptionText from '../../components/TourDescriptionText/TourDescriptionText';
import InfoTooltip from '../../components/InfoTooltip/InfoTooltip';
import ConfirmationPopup from '../../components/ConfirmationPopup/ConfirmationPopup';
import { Button } from '@mui/material';
import './ProductTourStyles.css';

const ProductTour = () => {
  const [selectedTour, setSelectedTour] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleSelect = (idTour) => {
    setSelectedTour(idTour);
  };

  const handleDelete = () => {
    // Handle delete logic
    setPopupOpen(false);
  };

  const handleEdit = () => {
    // Handle edit logic
  };

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const tours = [
    { title: 'Main dashboard - first login tour', timestamp: '10:00 AM', idTour: '184293', text: 'This pops up the first time the user logins to the dashboard.',
         onDelete: ()=>{}, onEdit: ()=>{} },
    // More tours...
  ];

  return (
    <div className="product-tour-page">
      <ContentHeader title="All Tours" />
      <ContentArea>
        <TourList items={tours} onSelectItem={handleSelect} />
        <Button variant="contained" color="primary" onClick={handleOpenPopup}>
          Create a new tour
        </Button>
        <TourDescriptionText description="A product onboarding tour is a guided walkthrough or tutorial..." />
        <InfoTooltip text="More info here" title="What is a product tour?" />
      </ContentArea>
      <ConfirmationPopup open={isPopupOpen} onConfirm={handleDelete} onCancel={handleClosePopup} />
    </div>
  );
};

export default ProductTour;
