import { Link } from "@mui/material";
import { useContext, useState } from "react";
import CardContainer from "../../components/Links/Card";
import Card from "../../components/Links/Card/Card";
import Popup from "../../components/Links/Popup/Popup";
import { HelperLinkContext } from "../../services/linksProvider";
import s from "./LinkPage.module.scss";

const LinkContent = () => {
  const [draggingItemIndex, setDraggingItemIndex] = useState(null);
  const [dragging, setDragging] = useState(false);

  const { links, toggleSettings, setLinks, setItemToDelete } =
    useContext(HelperLinkContext);

  const handleDragStart = (e, index) => {
    setDraggingItemIndex(index);
    setDragging(true);
  };

  const handleDrag = (e) => {
    if (draggingItemIndex === null) return;

    const container = e.target.parentNode.getBoundingClientRect();
    const x = e.clientX - container.left;
    const y = e.clientY - container.top;

    setLinks((prevItems) =>
      prevItems.map((item, index) =>
        index === draggingItemIndex ? { ...item, x, y } : item
      )
    );
  };

  const handleDragEnd = () => {
    const draggedItemIndex = draggingItemIndex;
    const { x, y, ...draggedItem } = items[draggedItemIndex];
    setDraggingItemIndex(null);
    setDragging(false);
    const newList = items.sort((a, b) => b.y - a.y);
    setLinks(newList);
  };

  return (
    <>
      <div className={s.body__links}>
        <h3 className={s.body__title}>Link items</h3>
        <CardContainer>
          {links.map((item, i) => (
            <Card
              card={item}
              key={item.id}
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
      <Popup />
    </>
  );
};

export default LinkContent;
