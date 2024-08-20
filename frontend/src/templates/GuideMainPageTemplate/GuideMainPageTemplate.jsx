import React from 'react';
import List from '../../components/TourComponents/List/List';
import ContentArea from '../../components/TourComponents/ContentArea/ContentArea';
import ContentHeader from '../../components/TourComponents/ContentHeader/ContentHeader';
import ConfirmationPopup from '../../components/TourComponents/ConfirmationPopup/ConfirmationPopup';
import Button from '../../components/Button/Button';
import './GuideMainPageTemplate.css';
import { ACTIVITY_TYPES_INFO, activityInfoData } from '../../data/GuideMainPageData';

const GuideMainPageTemplate = ({ items, handleSelect, handleDelete, isPopupOpen, handleClosePopup, type, onClick }) => {

  const { heading, paragraph, buttonText, title } = activityInfoData[type];

  return (
    <div className="product-page-container">
      <div className="product-page-header">
        <ContentHeader title={title} />
        <Button text={buttonText} onClick={onClick} />
      </div>
      <div className="product-page">
        <ContentArea className="content-area">
          <List items={items} onSelectItem={handleSelect} />
        </ContentArea>
        <div className="tour-info-container">
          <h4>{heading}</h4>
          <p dangerouslySetInnerHTML={{ __html: paragraph.replace(/\n/g, '</p><p>') }}></p>
        </div>
      </div>
      <ConfirmationPopup open={isPopupOpen} onConfirm={handleDelete} onCancel={handleClosePopup} />
    </div>
  );
};

export default GuideMainPageTemplate;
