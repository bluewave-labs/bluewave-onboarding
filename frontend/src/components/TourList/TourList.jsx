import React from 'react';
import PropTypes from 'prop-types';
import TourListItem from './TourListItem';

const TourList = ({ items, onSelectItem }) => {
  return (
    <div>
      {items.map(item => (
        <TourListItem
          key={item.idTour}
          title={item.title}
          timestamp={item.timestamp}
          onClick={() => onSelectItem(item.idTour)}
          onDelete={item.onDelete}
          onEdit={item.onEdit}
        />
      ))}
    </div>
  );
};

TourList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectItem: PropTypes.func.isRequired,
};

export default TourList;
