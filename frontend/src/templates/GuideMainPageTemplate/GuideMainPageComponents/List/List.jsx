import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem/ListItem';

const List = ({ items }) => {
  return (
    <>
      {items.map(item => (
        <ListItem
          key={item.idItem}
          title={item.title}
          text={item.text}
          id={item.idItem}
          onClick={() => {}}
          onDelete={item.onDelete}
          onEdit={item.onEdit}
        />
      ))}
    </>
  );
};

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  onSelectItem: PropTypes.func,
};

export default List;
