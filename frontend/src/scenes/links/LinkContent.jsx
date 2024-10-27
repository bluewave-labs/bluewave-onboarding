import { Link } from "@mui/material";
import PropTypes from "prop-types";
import CardContainer from "../../components/Links/Card";
import Card from "../../components/Links/Card/Card";
import s from "./LinkPage.module.scss";

const LinkContent = ({ showAppearance, listItems, toggleSettings }) => {
  return showAppearance ? null : (
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
          margin='0 0 0 1rem'
          display='inline-block'
        >
          + Add new link
        </Link>
      </CardContainer>
    </div>
  );
};

LinkContent.propTypes = {
  showAppearance: PropTypes.bool,
  listItems: PropTypes.arrayOf({
    title: PropTypes.string,
    url: PropTypes.string,
    id: PropTypes.number,
    order: PropTypes.number,
  }),
  toggleSettings: PropTypes.func,
};

export default LinkContent;
