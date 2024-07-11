import React, { useState } from 'react';
import TourList from '../../components/TourList/TourList';
import ContentArea from '../../components/ContentArea/ContentArea';
import ContentHeader from '../../components/ContentHeader/ContentHeader';
import ConfirmationPopup from '../../components/ConfirmationPopup/ConfirmationPopup';
import Button from '../../components/Button/Button';
import CustomCheckbox from '../../components/Checkbox/Checkbox';
import './ProductTourStyles.css';

const ProductTour = () => {
  const [selectedTour, setSelectedTour] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [checkboxState, setCheckboxState] = useState({
    design: true,
    welcome: true,
    announce: true,
    teach: true
  });

  const handleSelect = (idTour) => {
    setSelectedTour(idTour);
  };

  const handleDelete = () => {
    // Handle delete logic
    setPopupOpen(false);
  };

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const handleCheckboxChange = (field) => (event) => {
    setCheckboxState({
      ...checkboxState,
      [field]: event.target.checked
    });
  };

  const tours = [
    { 
      title: 'Use tours to', 
      timestamp: '10:00 AM', 
      idTour: '184293', 
      text: 'This pops up the first time the user logins to the dashboard.',
      checkboxes: [
        { label: "Design step by step product tours", checked: checkboxState.design },
        { label: "Welcome new users in the app", checked: checkboxState.welcome },
        { label: "Announce new changes & updates", checked: checkboxState.announce },
        { label: "Teach them something new", checked: checkboxState.teach }
      ]
    },
    // More tours...
  ];

  return (
    <div className="product-tour-page">
      <ContentHeader title="All Tours" />
      <ContentArea>
        <TourList items={tours} onSelectItem={handleSelect} />
        <Button text="Create a tour" variant="contained" className="button-primary" onClick={handleOpenPopup} />
        {/* <TourDescriptionText description="A product onboarding tour is a guided walkthrough or tutorial..." />
        <InfoTooltip text="More info here" title="What is a product tour?" /> */}
        <ConfirmationPopup open={isPopupOpen} onConfirm={handleDelete} onCancel={handleClosePopup} />
      </ContentArea>
    </div>
  );
};

export default ProductTour;