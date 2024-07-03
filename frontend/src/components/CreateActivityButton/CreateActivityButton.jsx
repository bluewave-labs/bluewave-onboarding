import React from "react";
import Button from "../Button/Button";
import "./CreateActivityButtonStyles.css";
import CheckIcon from "../CheckIcon/CheckIcon";

const ActivityButton = () => {

  const listItems = [
    "Announce a new feature",
    "Publish release notes",
    "Give more information about a recent news",
  ];

  return (
    <div className="bannerStyle">
      <div className="bannerContents">
        <h2 className="heading">Use banners to</h2>
        <ul>
          {listItems.map((list, index) => (
            <div className="list">
              <CheckIcon size='small' outline= {true} color='#7F56D9'/>
              <li className="listText" key={index}>
                {list}
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

export default ActivityButton;
