import React from "react";
import Button from "../Button/Button";
import "./CreateActivityButtonStyles.css";
import CheckIcon from "../CheckIcon/CheckIcon";
import PropTypes from "prop-types";
import { list } from "../../data/CreateActivityButtonData";

const CreateActivityButton = ({index}) => {
  return (
    <div className="bannerStyle">
      <div className="bannerContents">
          <h2 className="heading">{list[index].heading}</h2>
          <ul>
            {list[index].listItem.map((listItem, index) => (
              <div className="list" key={index}>
              <CheckIcon size='small' outline= {true} color='#7F56D9'/>
              <li className="listText" key={index}>
                {listItem}
              </li>
            </div>
            ))}
          </ul>
      </div>
      <div className="button">
        <Button text="Create a banner" className="button-primary-custom buttonStyle" />
      </div>
    </div>
  );
};

CreateActivityButton.propTypes = {
  index: PropTypes.oneOf([0, 1, 2, 3, 4])
} 

CreateActivityButton.defaultProps = {
  index: 2
}

export default CreateActivityButton;
