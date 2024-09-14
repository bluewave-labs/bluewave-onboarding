import React, { useState } from 'react';
import CreateActivityButton from "../../components/Button/CreateActivityButton/CreateActivityButton";
import { ACTIVITY_TYPES } from "../../data/CreateActivityButtonData";
import ParagraphCSS from "../../components/ParagraphCSS/ParagraphCSS";
import TourPage from './ProductTour';

const ToursDefaultPage = () => {
    const [showTourPage, setShowTourPage] = useState(false);

    const handleButtonClick = () => {
        setShowTourPage(true);
    };

    const style = {
        "display": "flex",
        "flex-direction": "column",
        "width": "100%",
        "justify-content": "center",
        "align-items": "center",
    };

    return (
        <>
            {showTourPage ? (
                <TourPage items={[]} />
            ) : (
                <div style={style}>
                    <ParagraphCSS />
                    <CreateActivityButton type={ACTIVITY_TYPES.TOURS} onClick={handleButtonClick} />
                </div>
            )}
        </>
    );
};

export default ToursDefaultPage;
