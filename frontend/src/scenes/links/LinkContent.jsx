import { Link } from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import CardContainer from "../../components/Links/Card";
import Card from "../../components/Links/Card/Card";
import { updateLink } from "../../services/linkService";
import s from "./LinkPage.module.scss";

const LinkContent = ({ listItems, toggleSettings }) => {
  const [items, setItems] = useState([]);
  const [draggingItemIndex, setDraggingItemIndex] = useState(null);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setItems(listItems.map((it) => ({ ...it, x: 0, y: 0 })));
  }, [listItems]);

  const handleDragStart = (e, index) => {
    setDraggingItemIndex(index);
    setDragging(true);
  };

  const handleDrag = (e) => {
    if (draggingItemIndex === null) return;

    const container = e.target.parentNode.getBoundingClientRect();
    const x = e.clientX - container.left;
    const y = e.clientY - container.top;

    setItems((prevItems) =>
      prevItems.map((item, index) =>
        index === draggingItemIndex ? { ...item, x, y } : item
      )
    );
  };

  const handleDragEnd = () => {
    const draggedItemIndex = draggingItemIndex;
    const { x, y, ...draggedItem } = items[draggedItemIndex];
    console.log({ draggedItem });
    setDraggingItemIndex(null);
    setDragging(false);
    console.log({ items });
    const newList = items.sort((a, b) => b.y - a.y)
    setItems(newList);
    updateLink({...draggedItem, order: newList.findIndex(it => it.id === draggedItem.id)});
  };

  return (
    <div className={s.body__links}>
      <h3 className={s.body__title}>Link items</h3>
      <CardContainer>
        {items.map((item, i) => (
          <Card
            {...item}
            key={item.id}
            toggleSettings={toggleSettings}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDrag={handleDrag}
            index={i}
            dragging={dragging}
            draggingItemIndex={draggingItemIndex}
          />
        ))}
        <Link
          onClick={toggleSettings}
          underline='hover'
          component='button'
          fontSize='0.785rem'
          lineHeight={1.43}
          display='inline-block'
          style={{ margin: "0 0 0 1.4rem" }}
        >
          + Add new link
        </Link>
      </CardContainer>
    </div>
  );
};

LinkContent.propTypes = {
  listItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
      id: PropTypes.number,
      order: PropTypes.number,
    })
  ),
  toggleSettings: PropTypes.func,
};

export default LinkContent;
