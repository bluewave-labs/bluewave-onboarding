import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem/ListItem';

const List = ({ items, onSelectItem }) => {
  return (
    <div>
      {items.map(item => (
        <ListItem
          key={item.idItem}
          title={item.title}
          text={item.text}
          id={item.idItem}
          onClick={() => onSelectItem(item.idItem)}
          onDelete={item.onDelete}
          onEdit={item.onEdit}
        />
      ))}
    </div>
  );
};

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSelectItem: PropTypes.func.isRequired,
};

export default List;
