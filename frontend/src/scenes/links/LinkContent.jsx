import { Link } from "@mui/material";
import PropTypes from "prop-types";
import CardContainer from "../../components/Links/Card";
import Card from "../../components/Links/Card/Card";
import s from "./LinkPage.module.scss";

const LinkContent = ({ listItems, toggleSettings }) => {
  return (
    <div className={s.body__links}>
      <h3 className={s.body__title}>Link items</h3>
      <CardContainer>
        {listItems.map((item) => (
          <Card {...item} key={item.id} toggleSettings={toggleSettings} />
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
